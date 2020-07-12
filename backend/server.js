const express = require('express')
const bodyParser = require('body-parser')
const app = express()

// Cors related
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

// Initial Fortune list
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
    { id: 11, fortune: "Nothing dries sooner than a tear." },
    { id: 12, fortune: "Old friends and old wine are best." },
    { id: 13, fortune: "The best of friends must part." },
    { id: 14, fortune: "The best things are not bought and sold." },
    { id: 15, fortune: "There is no better looking-glass than an old friend." },
    { id: 16, fortune: "To err is human (To forgive divine)." },
    { id: 17, fortune: "Two cannot fall out if one does not choose." },
    { id: 18, fortune: "A loveless life is a living death." },
    { id: 19, fortune: "Absence makes the heart grow fonder." },
    { id: 20, fortune: "All's fair in love and war." },
    { id: 21, fortune: "Beauty is in the eye of the beholder." },
    { id: 22, fortune: "Before you meet the handsome prince you have to kiss a lot of toads." },
    { id: 23, fortune: "Better to have loved and lost, than to have never loved at all." },
    { id: 24, fortune: "Cold hands, warm heart." },
    { id: 25, fortune: "Distance makes the heart grow fonder." },
    { id: 26, fortune: "Faint heart never won fair lady." },
    { id: 27, fortune: "First impressions are the most lasting." },
    { id: 28, fortune: "Hatred is as blind as love." },
    { id: 29, fortune: "Love and a cough cannot be hid." },
    { id: 30, fortune: "Love does much but money does all." },
    { id: 31, fortune: "Love levels all inequalities." },
    { id: 32, fortune: "Love makes a good eye squint." },
    { id: 33, fortune: "Love sees no faults." },
    { id: 34, fortune: "Love sought is good, but given unsought is better." },
    { id: 35, fortune: "Love to live and live to love." },
    { id: 36, fortune: "Love with life is heaven; and life unloving, hell." },
    { id: 37, fortune: "Man is the head but woman turns it." },
    { id: 38, fortune: "Marry in haste, repent at leisure." },
    { id: 39, fortune: "The course of love never did run smooth." },
    { id: 40, fortune: "The Lord loveth a cheerful liar." },
    { id: 41, fortune: "There is a thin line between love and hate." },
    { id: 42, fortune: "To eat one's heart out." },
    { id: 43, fortune: "True beauty lies within." },
    { id: 44, fortune: "You can't live on bread alone." },
    { id: 45, fortune: "A good friend is one's nearest relation." },
    { id: 46, fortune: "A man is known by the company he keeps." },
    { id: 47, fortune: "A man of straw needs a woman of gold." },
    { id: 48, fortune: "A wink is as good as a nod, to a blind man." },
    { id: 49, fortune: "An injury is forgiven better than an injury revenged." },
    { id: 50, fortune: "Anger and hate hinder good counsel." },
    { id: 51, fortune: "Appearances are deceptive." },
    { id: 52, fortune: "At a round table there's no dispute about the place." },
    { id: 53, fortune: "Attack is the best form of defense" },
    { id: 54, fortune: "Be slow in choosing, but slower in changing." },
    { id: 55, fortune: "Behind every great man stands a strong woman." },
    { id: 56, fortune: "Blood is thicker than water." },
    { id: 57, fortune: "Cheerfulness smooths the road of life." },
    { id: 58, fortune: "Confess and be hanged." },
    { id: 59, fortune: "Conscience makes cowards of us all." },
    { id: 60, fortune: "Don't blow your own trumpet." },
    { id: 61, fortune: "Do as you would be done by." },
    { id: 62, fortune: "Do unto others as you would have them do to you." },
    { id: 63, fortune: "Grow angry slowly; there's plenty of time." },
    { id: 64, fortune: "He bears misery best that hides it most." },
    { id: 65, fortune: "He that hurts another, hurts himself." },
    { id: 66, fortune: "He who wronged you will hate you." },
    { id: 67, fortune: "Heavy givers are light complainers." },
    { id: 68, fortune: "I am rubber and you are glue. Your words bounce off me and stick to you." },
    { id: 69, fortune: "If you lose your temper, don't look for it." },
    { id: 70, fortune: "It's not over till it's over." },
    { id: 71, fortune: "Joy shared is double joy; grief shared is (only) half grief." },
    { id: 72, fortune: "Laugh and the world laughs with you. Cry and you cry alone." },
    { id: 73, fortune: "Never let the sun set on angry heart." },
    { id: 74, fortune: "Never let the sun go down on your anger." },
    { id: 75, fortune: "Never let the sun set on thy wrath." },
    { id: 76, fortune: "Never quarrel with one's bread and butter." },
    { id: 77, fortune: "No man or woman is worth your tears, and the one who is, won't make you cry." },
    { id: 78, fortune: "Open confession is good for the soul." },
    { id: 79, fortune: "Out of sight, out of mind." },
    { id: 80, fortune: "Patience is a virtue." },
    { id: 81, fortune: "Persuasion is better than force." },
    { id: 82, fortune: "Spare the rod and spoil the child." },
    { id: 83, fortune: "Temper is so good a thing that we should never lose it." },
    { id: 84, fortune: "To the world you may be one person, but to one person, you may be the world." },
    { id: 85, fortune: "Wondrous is the strength of cheerfulness." },
    { id: 86, fortune: "You made your bed, now you must lie in it." },
    { id: 87, fortune: "A bully is always a coward." },
    { id: 88, fortune: "A handsome shoe often pinches the foot." },
    { id: 89, fortune: "A good thing is all the sweeter when won with pain." },
    { id: 90, fortune: "A man too careful of danger lives in continual torment." },
    { id: 91, fortune: "A miss is as good as a mile." },
    { id: 92, fortune: "Adversity flatters no man" },
    { id: 93, fortune: "Adversity and loss make a man wise" },
    { id: 94, fortune: "All promises are either broken or kept." },
    { id: 95, fortune: "All things come to those that wait." },
    { id: 96, fortune: "An eye for an eye and a tooth for a tooth." },
    { id: 97, fortune: "An open door may tempt a saint." },
    { id: 98, fortune: "As one door closes, another always opens." },
    { id: 99, fortune: "As you go through life, make this your goal, watch the doughnut and not the hole." }
];