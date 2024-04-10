# CG 2023/2024

## Group T11G09

## 1. Sky-Sphere

### 1.1. Criação de uma Esfera

No primeiro exercício, criamos uma nova classe `MySphere.js` que cria uma esfera com o centro na origem, com eixo central coincidente com o eixo Y e raio unitário. 

A esfera tem um número variável de slices e de stacks, este último correspondendo ao número de divisões angulares, desde a linha de equador até aos pólos.

Na função `initBuffers()`, começamos por criar todos os vértices (assim como as respetivas normal e coordenadas de textura), seguida da criação dos índices, tendo em consideração o pormenor de que ao redor dos pólos, a stack é formada por triângulos em vez de quadriláteros. 