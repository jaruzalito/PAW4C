file = open("graph.txt",'r')
macierz =[]
pom=[]
lines = file.readlines()
macierz.append(' ')
c=0;
for line in lines:
    c=c+1
c=c+1
macierz =[[0]*c for _ in range(c)]
c=0
for i in range (0,len(lines),1):
    a = line.strip().split()
    macierz[0][i]=c
    macierz[i][0]=c
    c=c+1
macierz[0][0]=' '
for line in lines:
    p=line.strip().split()
    pom.append(p)

for row in macierz:
    print(row)

print(pom)
print(len(pom))
sasiedzi_wszyscy = []
for wiersz in pom:
    indeks = int(wiersz[0])  # Pierwszy element to numer wierzchołka
    sasiedzi = list(map(int, wiersz[1:]))  # Pozostałe elementy to sąsiedzi
    sasiedzi_wszyscy = [list(map(int, wiersz[1:])) for wiersz in pom]


print(sasiedzi_wszyscy)


for i in range(1, len(macierz[0])):  
    a = macierz[0][i]
    for k in range(len(pom)):
        if int(pom[k][0]) == int(a):
            for j in range(len(sasiedzi_wszyscy[k])):
                b = sasiedzi_wszyscy[k][j]
                for m in range(1, len(macierz)):
                    if macierz[m][0] == b:
                        macierz[i][m] = 1
                        macierz[m][i] = 1

for row in macierz:
    print(row)
