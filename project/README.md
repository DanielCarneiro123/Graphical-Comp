# CG 2023/2024

## Group T11G09

## 1. Sky-Sphere

### 1.1. Criação de uma Esfera

No primeiro exercício, criamos uma nova classe `MySphere.js` que cria uma esfera com o centro na origem, com eixo central coincidente com o eixo Y e raio unitário. 

A esfera tem um número variável de slices e de stacks, este último correspondendo ao número de divisões angulares, desde a linha de equador até aos pólos.

Na função `initBuffers()`, começamos por criar todos os vértices (assim como as respetivas normal e coordenadas de textura), seguida da criação dos índices, tendo em consideração o pormenor de que ao redor dos pólos, a stack é formada por triângulos em vez de quadriláteros. 

![Earth](screenshots/project-t11g09-1.1.png)
<p align="center">Figure 1: Sphere with Earth texture</p>

### 1.2. Adição de Panoramas

Utilizando a classe `MySphere`, conseguimos facilmente criar um panorama, invertendo as suas faces, de forma a que seja visível por dentro e não por fora.

Desta forma, na classe `MyPanorama`, o construtor recebe uma CGFtexture, e é responsável por criar uma MySphere invertida, dotada de um material apenas com componente emissiva e coberta pela textura passada como argumento.

Por fim, para criar a ilusão de que a superfície esférica se encontra sempre posicionada no infinito, aplicamos um movimento de translação ao panorama de modo a que ficasse sempre centrada com a câmara.

![Panorama](screenshots/project-t11g09-1.2.png)
<p align="center">Figure 2: Earth and Panorama</p>