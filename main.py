def on_button_pressed_a():
    bird.change(LedSpriteProperty.Y, 1)
input.on_button_pressed(Button.A, on_button_pressed_a)

def on_logo_long_pressed():
    global bird, Obstacles, EmptyObstacleY
    bird = game.create_sprite(0, 2)
    Obstacles = []
    EmptyObstacleY = randint(0, 4)
    for índice in range(5):
        if índice != EmptyObstacleY:
            Obstacles.append(game.create_sprite(4, índice))
input.on_logo_event(TouchButtonEvent.LONG_PRESSED, on_logo_long_pressed)

def on_button_pressed_b():
    bird.change(LedSpriteProperty.Y, -1)
input.on_button_pressed(Button.B, on_button_pressed_b)

ticks = 0
EmptyObstacleY = 0
Obstacles: List[game.LedSprite] = []
bird: game.LedSprite = None
for index in range(4):
    basic.show_leds("""
        . . . . .
                . # . # .
                . . # . .
                . . . . .
                # # # # #
    """)
    basic.pause(100)
    basic.show_leds("""
        . . . . .
                . . # . .
                . # . # .
                . . . . .
                # # # # #
    """)

def on_forever():
    global EmptyObstacleY, ticks
    while len(Obstacles) > 0 and Obstacles[0].get(LedSpriteProperty.X) == 0:
        Obstacles.remove_at(0).delete()
    for obstacle in Obstacles:
        obstacle.change(LedSpriteProperty.X, -1)
    EmptyObstacleY = randint(0, 4)
    if ticks % 3 == 0:
        for índice2 in range(5):
            if índice2 != EmptyObstacleY:
                Obstacles.append(game.create_sprite(4, índice2))
    for obstacle2 in Obstacles:
        if obstacle2.get(LedSpriteProperty.X) == bird.get(LedSpriteProperty.X) and obstacle2.get(LedSpriteProperty.Y) == bird.get(LedSpriteProperty.Y):
            game.game_over()
    ticks += 1
    basic.pause(1000)
basic.forever(on_forever)
