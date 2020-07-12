const express = require('express')
const bodyParser = require('body-parser')
const app = express()

// CORS related
const cors = require('cors')
var corsOptions = {
  origin: 'http://localhost:4200',
  optionsSuccessStatus: 200,
}
app.use(cors(corsOptions))

app.use(bodyParser.json())

app.listen(8000, () => {
    console.log('Server started!')
  })

app.route('/api/fortune').get((req, res) => {
    res.send(fortuneList)
})

app.route('/api/fortune').put((req, res) => {
    fortuneList[req.body.id] = req.body;
    res.status(201).send(req.body)
})

// app.route('/api/cats/:name').get((req, res) => {
//     const requestedCatName = req.params['name']
//     res.send({ name: requestedCatName })
//   })

// app.route('/api/cats').post((req, res) => {
//     res.send(201, req.body)
// })

// app.route('/api/cats/:name').put((req, res) => {
//     res.send(200, req.body)
// })

// app.route('/api/cats/:name').delete((req, res) => {
//     res.sendStatus(204)
// })

fortuneList = [
    { id: 0, fortune: "A friend's frown is better than a fool's smile." },
    { id: 1, fortune: "A friend in need is a friend indeed." },
    { id: 2, fortune: "A friend is easier lost than found." },
    { id: 3, fortune: "A friend to everybody is a friend to nobody." },
    { id: 4, fortune: "A problem shared is a problem halved." },
    { id: 5, fortune: "A true friend is someone who reaches for your hand, but touches your heart." },
    { id: 6, fortune: "False friends are worse than open enemies." },
    { id: 7, fortune: "Flattery is all right so long as you don't inhale." },
    { id: 8, fortune: "Give credit where credit is due." },
    { id: 9, fortune: "Grief divided is made lighter." },
    { id: 10, fortune: "Memory is the treasure of the mind." },
    // { id: 11, fortune: "Nothing dries sooner than a tear." },
    // { id: 12, fortune: "Old friends and old wine are best." },
    // { id: 13, fortune: "The best of friends must part." },
    // { id: 14, fortune: "The best things are not bought and sold." },
    // { id: 15, fortune: "There is no better looking-glass than an old friend." },
    // { id: 16, fortune: "To err is human (To forgive divine)." },
    // { id: 17, fortune: "Two cannot fall out if one does not choose." },
    // { id: 18, fortune: "A loveless life is a living death." },
    // { id: 19, fortune: "Absence makes the heart grow fonder." },
    // { id: 20, fortune: "All's fair in love and war." },
    // { id: 21, fortune: "Beauty is in the eye of the beholder." },
    // { id: 22, fortune: "Before you meet the handsome prince you have to kiss a lot of toads." },
    // { id: 23, fortune: "Better to have loved and lost, than to have never loved at all." },
    // { id: 24, fortune: "Cold hands, warm heart." },
    // { id: 25, fortune: "Distance makes the heart grow fonder." },
    // { id: 26, fortune: "Faint heart never won fair lady." },
    // { id: 27, fortune: "First impressions are the most lasting." },
    // { id: 28, fortune: "Hatred is as blind as love." },
    // { id: 29, fortune: "Love and a cough cannot be hid." },
    // { id: 30, fortune: "Love does much but money does all." },
    // { id: 31, fortune: "Love levels all inequalities." },
    // { id: 32, fortune: "Love makes a good eye squint." },
    // { id: 33, fortune: "Love sees no faults." },
    // { id: 34, fortune: "Love sought is good, but given unsought is better." },
    // { id: 35, fortune: "Love to live and live to love." },
    // { id: 36, fortune: "Love with life is heaven; and life unloving, hell." },
    // { id: 37, fortune: "Man is the head but woman turns it." },
    // { id: 38, fortune: "Marry in haste, repent at leisure." },
    // { id: 39, fortune: "The course of love never did run smooth." },
    // { id: 40, fortune: "The Lord loveth a cheerful liar." },
    // { id: , fortune: "There is a thin line between love and hate." },
    // { id: , fortune: "To eat one's heart out." },
    // { id: , fortune: "True beauty lies within." },
    // { id: , fortune: "You can't live on bread alone." },
    // { id: , fortune: "A good friend is one's nearest relation." },
    // { id: , fortune: "A man is known by the company he keeps." },
    // { id: , fortune: "A man of straw needs a woman of gold." },
    // { id: , fortune: "A wink is as good as a nod, to a blind man." },
    // { id: , fortune: "An injury is forgiven better than an injury revenged." },
    // { id: , fortune: "Anger and hate hinder good counsel." },
    // { id: , fortune: "Appearances are deceptive." },
    // { id: , fortune: "At a round table there's no dispute about the place." },
    // { id: , fortune: "Attack is the best form of defense" },
    // { id: , fortune: "Be slow in choosing, but slower in changing." },
    // { id: , fortune: "Behind every great man stands a strong woman." },
    // { id: , fortune: "Blood is thicker than water." },
    // { id: , fortune: "Cheerfulness smooths the road of life." },
    // { id: , fortune: "Confess and be hanged." },
    // { id: , fortune: "Conscience makes cowards of us all." },
    // { id: , fortune: "Don't blow your own trumpet." },
    // { id: , fortune: "Do as you would be done by." },
    // { id: , fortune: "Do unto others as you would have them do to you." },
    // { id: , fortune: "Grow angry slowly; there's plenty of time." },
    // { id: , fortune: "He bears misery best that hides it most." },
    // { id: , fortune: "He that hurts another, hurts himself." },
    // { id: , fortune: "He who wronged you will hate you." },
    // { id: , fortune: "Heavy givers are light complainers." },
    // { id: , fortune: "I am rubber and you are glue. Your words bounce off me and stick to you." },
    // { id: , fortune: "If you lose your temper, don't look for it." },
    // { id: , fortune: "It's not over till it's over." },
    // { id: , fortune: "Joy shared is double joy; grief shared is (only) half grief." },
    // { id: , fortune: "Laugh and the world laughs with you. Cry and you cry alone." },
    // { id: , fortune: "Never let the sun set on angry heart." },
    // { id: , fortune: "Never let the sun go down on your anger." },
    // { id: , fortune: "Never let the sun set on thy wrath." },
    // { id: , fortune: "Never quarrel with one's bread and butter." },
    // { id: , fortune: "No man or woman is worth your tears, and the one who is, won't make you cry." },
    // { id: , fortune: "Open confession is good for the soul." },
    // { id: , fortune: "Out of sight, out of mind." },
    // { id: , fortune: "Patience is a virtue." },
    // { id: , fortune: "Persuasion is better than force." },
    // { id: , fortune: "Spare the rod and spoil the child." },
    // { id: , fortune: "Temper is so good a thing that we should never lose it." },
    // { id: , fortune: "To the world you may be one person, but to one person, you may be the world." },
    // { id: , fortune: "Wondrous is the strength of cheerfulness." },
    // { id: , fortune: "You made your bed, now you must lie in it." },
    // { id: , fortune: "A bully is always a coward." },
    // { id: , fortune: "A handsome shoe often pinches the foot." },
    // { id: , fortune: "A good thing is all the sweeter when won with pain." },
    // { id: , fortune: "A man too careful of danger lives in continual torment." },
    // { id: , fortune: "A miss is as good as a mile." },
    // { id: , fortune: "Adversity flatters no man" },
    // { id: , fortune: "Adversity and loss make a man wise" },
    // { id: , fortune: "All promises are either broken or kept." },
    // { id: , fortune: "All things come to those that wait." },
    // { id: , fortune: "An eye for an eye and a tooth for a tooth." },
    // { id: , fortune: "An open door may tempt a saint." },
    // { id: , fortune: "As one door closes, another always opens." },
    // { id: , fortune: "As you go through life, make this your goal, watch the doughnut and not the hole." }
];