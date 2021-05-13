import { browser, by, element } from 'protractor';

export class AppPage {
  navigateTo(): Promise<unknown> {
    return browser.get(browser.baseUrl) as Promise<unknown>;
  }

  getTitleText(): Promise<string> {
    return element(by.css('.jumbotron-heading')).getText() as Promise<
      string
    >;
  }

  getFactText(): Promise<string> {
    return element(by.css('.text-muted.fortune-text')).getText() as Promise<string>;
  }

  getOpenFortuneCookieButton() {
    return element(by.css('.btn.btn-primary'))
  }

  getSeeAllfortuneText(): Promise<string> {
    return element(by.id('seeAllFortune')).getText() as Promise<string>;
  }

  changeLanguage(optionNum: number) {
    element.all(by.tagName('option')).then((options) => options[optionNum].click());
  }

  getUserFortune() {
    return element(by.id('userFortune'));
  }

  getConsumeButton(){
    return element(by.css('.btn.btn-secondary'))
  }

  getLastAction(): Promise<string> {
    return element(by.id('actionLast')).getText() as Promise<string>;
  }

  getModalTitle(): Promise<string> {
    return element(by.id('modal-basic-title')).getText() as Promise<string>;
  }

  getModalMessage(): Promise<string> {
    return element(by.id('consumeConfirmation')).getText() as Promise<string>;
  }

  consumeNoClick(){
    element(by.css('.btn.btn-danger')).click()
  }

  consumeYesClick(){
    element(by.css('.btn.btn-outline-dark')).click()
  }

  getInputFortune(){
    return element(by.tagName('input'))
  }

  showAllFortune(){
    element(by.tagName('img')).click()
  }

  closeAllfortune(){
    element(by.css('.close')).click()
  }

  getAllFortune(){
    return element.all(by.tagName('li'))
  }

  getModalFooter(){
    return element(by.css('.modal-footer'))
  }

  getUpdateButton(){
    return element(by.css('.btn.btn-primary.update-btn'))
  }

  getCancelButton(){
    return element(by.css('.btn.btn-light.update-btn'))
  }

  toggleEditMode(){
    element(by.tagName('fa-icon')).click()
  }

  addFortune(newFortune: string){
    element(by.id('inputNewFortune')).sendKeys(newFortune)
    return element(by.id('addFortuneBtn')).click()
  }

  deleteFortuneBtnClick(){
    return element(by.id('deleteFortuneBtn')).click()
  }
}
