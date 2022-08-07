input.onButtonPressed(Button.A, function () {
    bird.change(LedSpriteProperty.Y, 1)
})
input.onButtonPressed(Button.B, function () {
    bird.change(LedSpriteProperty.Y, -1)
})
let ticks = 0
let bird: game.LedSprite = null
bird = game.createSprite(0, 2)
bird.set(LedSpriteProperty.Blink, 300)
let obstacles: game.LedSprite[] = []
let emptyObstacleY = randint(0, 4)
for (let índice = 0; índice <= 4; índice++) {
    if (índice != emptyObstacleY) {
        obstacles.push(game.createSprite(4, índice))
    }
}
basic.forever(function () {
    while (obstacles.length > 0 && obstacles[0].get(LedSpriteProperty.X) == 0) {
        obstacles.removeAt(0).delete()
    }
    for (let obstacle of obstacles) {
        obstacle.change(LedSpriteProperty.X, -1)
    }
    if (ticks % 3 == 0) {
        emptyObstacleY = randint(0, 4)
        for (let índice = 0; índice <= 4; índice++) {
            if (índice != emptyObstacleY) {
                obstacles.push(game.createSprite(4, índice))
            }
        }
        for (let obstacle of obstacles) {
            if (obstacle.get(LedSpriteProperty.X) == bird.get(LedSpriteProperty.X) && obstacle.get(LedSpriteProperty.Y) == bird.get(LedSpriteProperty.Y)) {
                game.gameOver()
            }
        }
        ticks += 1
        basic.pause(1000)
    }
})
