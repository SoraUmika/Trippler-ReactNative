from pygame.image import tostring
from kivy.core.image import ImageData
from kivy.graphics.texture import Texture
import pygame
pygame.init()

screen = pygame.display.set_mode((500, 500))


def buffer_image(source, x, y, width, height):
    image = pygame.image.load(source)
    image = pygame.transform.chop(image, (x, y, width, height))
    buffer = tostring(image, 'RGB', True)
    imdata = ImageData(width, height, 'rgb', buffer)
    texture = Texture.create(size=(640, 480))
    texture = Texture.create_from_data(im=imdata)

buffer_image('firstIMG.jpg', 0, 0, 50, 50)

surface = pygame.Surface((500, 500))
surface.fill((255, 255, 255))
surface = pygame.transform.chop(surface, (0, 0, 250, 250))

if __name__ == "__main__":
    run = True
    while run:
        for event in pygame.event.get():
            if event.type == pygame.QUIT:
                pygame.quit()

        screen.blit(surface, (0, 0))
        pygame.display.flip()

