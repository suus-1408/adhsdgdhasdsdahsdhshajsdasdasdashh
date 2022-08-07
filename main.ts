input.onButtonPressed(Button.A, function () {
    bird.change(LedSpriteProperty.Y, 1)
})
input.onLogoEvent(TouchButtonEvent.LongPressed, function () {
    bird = game.createSprite(0, 2)
    Obstacles = []
    EmptyObstacleY = randint(0, 4)
    for (let índice = 0; índice <= 4; índice++) {
        if (índice != EmptyObstacleY) {
            Obstacles.push(game.createSprite(4, índice))
        }
    }
})
input.onButtonPressed(Button.B, function () {
    bird.change(LedSpriteProperty.Y, -1)
})
let ticks = 0
let EmptyObstacleY = 0
let Obstacles: game.LedSprite[] = []
let bird: game.LedSprite = null
for (let index = 0; index < 4; index++) {
    basic.showLeds(`
        . . . . .
        . # . # .
        . . # . .
        . . . . .
        # # # # #
        `)
    basic.pause(100)
    basic.showLeds(`
        . . . . .
        . . # . .
        . # . # .
        . . . . .
        # # # # #
        `)
}
basic.forever(function () {
    while (Obstacles.length > 0 && Obstacles[0].get(LedSpriteProperty.X) == 0) {
        Obstacles.removeAt(0).delete()
    }
    for (let obstacle of Obstacles) {
        obstacle.change(LedSpriteProperty.X, -1)
    }
    EmptyObstacleY = randint(0, 4)
    if (ticks % 3 == 0) {
        for (let índice = 0; índice <= 4; índice++) {
            if (índice != EmptyObstacleY) {
                Obstacles.push(game.createSprite(4, índice))
            }
        }
    }
    for (let obstacle of Obstacles) {
        if (obstacle.get(LedSpriteProperty.X) == bird.get(LedSpriteProperty.X) && obstacle.get(LedSpriteProperty.Y) == bird.get(LedSpriteProperty.Y)) {
            game.gameOver()
        }
    }
    ticks += 1
    basic.pause(1000)
})
