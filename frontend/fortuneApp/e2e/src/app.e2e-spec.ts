import { AppPage } from './app.po';
import { browser, ExpectedConditions, logging, element, by} from 'protractor';

describe('workspace-project App', () => {
  let page: AppPage;

  beforeEach(() => {
    page = new AppPage();
  });

  it('Should load page', () => {
    page.navigateTo();
    expect(page.getTitleText()).toEqual('Get your fortune cookie!');
    expect(page.getFactText()).toEqual('A fortune cookie is a crisp cookie usually made from four, sugar, vanilla and sesame seed oil with a piece of paper inside, a "Fortune", on which is an aphorism or a vague prophecy.')
    expect(page.getOpenFortuneCookieButton().getText()).toEqual('Open Fortune Cookie')
    expect(page.getSeeAllfortuneText()).toEqual('You can click the fortune cookie image to see all possible fortune!')
  });

  it('Should change the language', () => {
    page.navigateTo();
    page.changeLanguage(1);
    expect(page.getTitleText()).toEqual('Get your fortune cookie!_JA');
    expect(page.getFactText()).toEqual('A fortune cookie is a crisp cookie usually made from four, sugar, vanilla and sesame seed oil with a piece of paper inside, a "Fortune", on which is an aphorism or a vague prophecy._JA')
    expect(page.getOpenFortuneCookieButton().getText()).toEqual('Open Fortune Cookie_JA')
    expect(page.getSeeAllfortuneText()).toEqual('You can click the fortune cookie image to see all possible fortune!_JA')
  });

  it('Should see all available fortune', () => {
    var expectedFortunes = ['A friend\'s frown is better than a fool\'s smile.',
                            'A friend in need is a friend indeed.',
                            'A friend is easier lost than found.',
                            'A friend to everybody is a friend to nobody.',
                            'A problem shared is a problem halved.']
    page.navigateTo();
    page.showAllFortune();
    expect(page.getModalTitle()).toEqual('All Fortune')
    page.getAllFortune().then(fortunes => {
      for (var i=0; i<fortunes.length; i++){
        expect(fortunes[i].getText()).toEqual(expectedFortunes[i])
      }
    })
    expect(page.getModalFooter().isPresent()).toBeFalsy()
    page.closeAllfortune()

  });

  it('Should toggle edit mode in \'All Fortune\' Modal', () => {
    page.navigateTo();
    page.showAllFortune();
    expect(page.getModalFooter().isPresent()).toBeFalsy()
    page.toggleEditMode();
    expect(page.getModalFooter().isPresent()).toBeTruthy()
  });

  it('Should Add new fortune', () => {
    var expectedFortunes = ['A friend\'s frown is better than a fool\'s smile.',
                            'A friend in need is a friend indeed.',
                            'A friend is easier lost than found.',
                            'A friend to everybody is a friend to nobody.',
                            'A problem shared is a problem halved.',
                            'This should be added']
    
    page.navigateTo()
    page.showAllFortune()
    page.toggleEditMode()
    page.addFortune('This should be added').then(_ => {
      page.getAllFortune().then(fortunes => {
        for (var i=0; i<fortunes.length; i++){
          expect(fortunes[i].getText()).toEqual(expectedFortunes[i])
        }
      })
    })
  });

  it('Should delete a fortune', () => {
    var expectedFortunes = ['A friend\'s frown is better than a fool\'s smile.',
                            'A friend in need is a friend indeed.',
                            'A friend is easier lost than found.',
                            'A friend to everybody is a friend to nobody.',
                            'A problem shared is a problem halved.']
    page.navigateTo()
    page.showAllFortune()
    page.toggleEditMode()
    page.getAllFortune().then(fortunes => {
      fortunes.forEach(element => {
        element.getText().then(text=>{
          if (text==='This should be added'){
            element.element(by.tagName('input')).click();
          }
        })
      });
    })
    page.deleteFortuneBtnClick().then(_=>{
      page.getAllFortune().then(fortunes => {
        for (var i=0; i<fortunes.length; i++){
          expect(fortunes[i].getText()).toEqual(expectedFortunes[i])
        }
      })
    })
  });

  it('Should open a fortune cookie', () => {
    page.navigateTo();
    page.getOpenFortuneCookieButton().click()
    expect(page.getUserFortune().isPresent()).toBeTruthy()
    expect(page.getOpenFortuneCookieButton().isPresent()).toBeFalsy()
    expect(page.getConsumeButton().getText()).toEqual('Consume Fortune Cookie')
    expect(page.getLastAction()).toEqual('You opened a fortune cookie! Consume it to open another cookie.')
  });

  it('Should consume a fortune cookie with no update', () => {
    page.navigateTo();
    page.getOpenFortuneCookieButton().click()
    page.getConsumeButton().click()
    expect(page.getModalTitle()).toEqual('Before Consuming')
    expect(page.getModalMessage()).toEqual('You can change the fortune of the last cookie. Would you like to change it?')
    page.consumeNoClick()
    expect(page.getConsumeButton().isPresent).toBeTruthy()
    expect(page.getLastAction()).toEqual('You consumed a fortune cookie!')
    expect(page.getSeeAllfortuneText()).toEqual('You can click the fortune cookie image to see all possible fortune!')
  });

  it('Should consume a fortune cookie with no update by user cancel', () => {
    page.navigateTo();
    page.getOpenFortuneCookieButton().click()
    page.getConsumeButton().click()
    page.consumeYesClick()
    expect(page.getUserFortune().isPresent).toBeTruthy()
    expect(page.getUpdateButton().getText()).toEqual('Update Fortune')
    expect(page.getCancelButton().getText()).toEqual('Cancel Update')
    page.getCancelButton().click()

    expect(page.getOpenFortuneCookieButton().getText()).toEqual('Open Fortune Cookie')
    expect(page.getSeeAllfortuneText()).toEqual('You can click the fortune cookie image to see all possible fortune!')
    expect(page.getLastAction()).toEqual('You consumed a fortune cookie!')
  });

  it('Should consume a fortune cookie, user forgot to add new fortune', () => {
    page.navigateTo();
    page.getOpenFortuneCookieButton().click()
    page.getConsumeButton().click()
    page.consumeYesClick()
    page.getUpdateButton().click()

    expect(page.getUserFortune().isPresent).toBeTruthy()
    expect(page.getUpdateButton().getText()).toEqual('Update Fortune')
    expect(page.getCancelButton().getText()).toEqual('Cancel Update')
    expect(page.getLastAction()).toEqual('You forgot to input a new fortune! you may click \"Cancel Update\" to open another cookie without updating the fortune.')
  });

  it('Should consume a fortune cookie and successfully updated the fortune', () => {
    page.navigateTo();
    page.getOpenFortuneCookieButton().click()
    page.getConsumeButton().click()
    page.consumeYesClick()
    page.getInputFortune().sendKeys('Update to this fortune')

    page.getUserFortune().getText().then(userFortune => {
      page.showAllFortune()
      page.getAllFortune().then(fortunes=>{
        var targetFortune: number;
        fortunes.forEach(element => {
          element.getText().then(text=>{
            if (text==userFortune){
              element.getAttribute('value').then(target =>{
                targetFortune = target
              })
            }
          })
        });

        page.closeAllfortune()
        page.getUpdateButton().click()
        expect(page.getLastAction()).toEqual('You consumed a fortune cookie and changed a fortune!')
        expect(page.getSeeAllfortuneText()).toEqual('You can click the fortune cookie image to see all possible fortune!')

        page.showAllFortune()
        page.getAllFortune().then(fortunes=>{
          expect(fortunes[targetFortune].getText()).toEqual('Update to this fortune')
        })
      })
    })
  });

  it('Should consume a fortune cookie and will not be able to update fortune since other user deleted', () => {
    page.navigateTo();
    page.getOpenFortuneCookieButton().click()
    page.getConsumeButton().click()
    page.consumeYesClick()
    page.getInputFortune().sendKeys('Update to this fortune')

    page.getUserFortune().getText().then(userFortune => {
      page.showAllFortune()
      page.toggleEditMode()
      page.getAllFortune().then(fortunes=>{        
        fortunes.forEach(element => {
          element.getText().then(text=>{
            if (text==userFortune){
              element.element(by.tagName('input')).click();
            }
          })
        });

        page.deleteFortuneBtnClick()
        page.closeAllfortune()
        page.getUpdateButton().click()
        expect(page.getLastAction()).toEqual('Sorry, someone already deleted that fortune!')
        expect(page.getSeeAllfortuneText()).toEqual('You can click the fortune cookie image to see all possible fortune!')
      })
    })
  });

  afterEach(async () => {
    // Assert that there are no errors emitted from the browser
    const logs = await browser.manage().logs().get(logging.Type.BROWSER);
    expect(logs).not.toContain(
      jasmine.objectContaining({
        level: logging.Level.SEVERE
      } as logging.Entry)
    );
  });
});
