---
title: ACM-test-second
top: false
cover: false
toc: true
mathjax: true
date: 2021-12-29 21:07:43
password:
summary: ACM期末考试（二）
tags:
- Algorithm
- ACM
categories:
- Algorithm
- ACM
keywords:
description:
---

## Problem A

### Problem Description

最近2年，以小黄车为代表的共享单车飞速发展，在某种意义上确实给大家带来了便利。

这几天，小明就在思考一个问题：“骑车”是否一定比“走路”快呢？
毕竟，如果决定骑车的话，在找车、开锁、停车、锁车等环节也要花时间的。

假设要行走的距离为L米，每次找车和开锁的一共时间是T1秒，每次停车和锁车的时间一共是T2秒，骑车的速度为V1米/秒，行走的速度为V2米/秒。

你现在是个小程序员了，请编程判断是骑车快还是走路快。

### Input

输入首先包含一个正整数N（N<100），表示有N组测试数据。
每组数据占一行，包含5个正整数L（L<10000）、T1（T1<100）、T2（T2<100）、V1（V1<100）、V2（V2<100），数据含义如题目描述。

### Output

如果骑小黄车更快的话，请输出”Bike is OK!”；
如果走路更快的话，请输出”Walk is OK!”；
如果一样快，请输出”Both are OK!”；
每组数据输出一行。

### Sample Input

```
1
150 20 15 5 2
```

### Sample Output

```
Bike is OK!
```

### code

```c++
#include <bits/stdc++.h>
#include <iostream>
using namespace std;

int main()
{
    int ceshiNum;
    cin >> ceshiNum;
    int L, T1, T2, V1, V2;
    double timeBike = 0.0;
    double timeWalk = 0.0;
    for (int i = 0; i < ceshiNum; i++)
    {
        cin >> L >> T1 >> T2 >> V1 >> V2;
        timeBike = T1 + T2 + (double)L / V1;
        timeWalk = (double)L / V2;
        if (timeBike < timeWalk)
        {
            cout << "Bike is OK!" << endl;
        }
        else if (timeBike > timeWalk)
        {
            cout << "Walk is OK!" << endl;
        }
        else
        {
            cout << "Both are OK!" << endl;
        }
    }
}
```

## Problem B

### Problem Description

陈飞宇小朋友今年6岁了，长得虎头虎脑，人见人爱！
尽管还只是幼儿园大班，但他已经开始学习一些简单的几何了~

最近，他刚刚学习了一些关于三角形的知识，初步知道了什么是锐角三角形、什么是直角三角形、什么是钝角三角形。

现在，他遇到这么一个难题：
给定三条线段，如何判断它们能组成一个什么类型的三角形呢？

现在，飞宇小朋友向学习信奥的你求助来了，你能帮帮他吗？

### Input

输入数据第一行是一个正整数N，表示有N组测试用例。

接下来N行，每行包含三个正整数 A, B, C (0 < A, B, C < 10000)，表示三条线段的长度。

### Output

对于每组数据给定的三条线段：

如果能够组成直角三角形，请输出 "Right triangle" ；
如果能够组成锐角三角形，请输出 "Acute triangle" ；
如果能够组成钝角三角形，请输出 "Obtuse triangle" ；
如果不能组成三角形，请输出"Impossible!"；

所有的输出，都不包含双引号，参见Sample Output.

### Sample Input

```
3
12 12 12
4 6 12
6 8 12
```

### Sample Output

```
Acute triangle
Impossible!
Obtuse triangle
```

### code

```c++
#include<bits/stdc++.h>
#include<iostream>
using namespace std;

void printData(int a, int b, int c);

int main()
{
    int testNum = 0;
    cin >> testNum;
    int data1, data2, data3;
    for (int i = 0; i < testNum; i++){
        cin >> data1 >> data2 >> data3;
        printData(data1, data2, data3);
    }
}

void printData(int a, int b, int c)
{
    if((a+b)<c){
        cout << "Impossible!" << endl;
        return;
    }
    if((a+c)<b){
        cout << "Impossible!" << endl;
        return;
    }
    if((b+c)<a){
        cout << "Impossible!" << endl;
        return;
    }
    if(a >= b && a >= c){
        if(pow(a,2) > pow(b,2)+pow(c,2)){
            cout << "Obtuse triangle" << endl;
        }
        else if(pow(a,2) == pow(b,2)+pow(c,2)){
            cout << "Right triangle" << endl;
        }
        else if(pow(a,2) < pow(b,2)+pow(c,2)){
            cout << "Acute triangle" << endl;
        }
    }
    else if(b >= a && b >= c){
        if(pow(b,2) > pow(a,2)+pow(c,2)){
            cout << "Obtuse triangle" << endl;
        }
        else if(pow(b,2) == pow(a,2)+pow(c,2)){
            cout << "Right triangle" << endl;
        }
        else if(pow(b,2) < pow(a,2)+pow(c,2)){
            cout << "Acute triangle" << endl;
        }
    }
    else if(c >= a && c >= b){
        if(pow(c,2) > pow(a,2)+pow(b,2)){
            cout << "Obtuse triangle" << endl;
        }
        else if(pow(c,2) == pow(a,2)+pow(b,2)){
            cout << "Right triangle" << endl;
        }
        else if(pow(c,2) < pow(a,2)+pow(b,2)){
            cout << "Acute triangle" << endl;
        }
    }
}
```

## Problem C

### Problem Description

正所谓——“百年不遇年年遇”！
某年夏天，中国西南诸省再次出现了“百年不遇”的严重旱情！

由于灾情越来越严重，很多学校师生的用水困难已成为最急需解决的问题，而要给各学校提供用水，就必须先知道各学校是否与水库有道路相连。

胡承轩——国家防汛抗旱总指挥部总指挥，现在想请你编写一个程序，读入所有道路的信息，计算有多少学校没有路与水库相通。

同学们，好好学信奥，为胡总指挥分忧~

### Input

输入有多组数据。

每组数据第一行包括两个正整数n，m（0<n<1000, 0<m<=(n*(n+1)/2), n表示学校的数目，m表示道路的数目），学校用1到n的整数编号，水库的编号永远记为0；

接下来有m行，每行有两个数a和b，a和b用一个空格分开，表示a到b有一条路。

请处理到文件结束。

### Output

对于每组输入数据：
如果所有的学校均与水库相通，则请在一行内输出0；
如果有学校不通水库，则请输出与水库无路连接的学校个数；

每组数据的输出占一行。

### Sample Input

```
4 4
0 1
0 2
1 2
2 3
```

### Sample Output

```
1
```

### code

```c++
#include <bits/stdc++.h>
using namespace std;

int fa[10010];
void init(int n)
{
    for (int i = 0; i <= n; i++)
        fa[i] = i;
}
int find(int x) { return x == fa[x] ? x : fa[x] = find(fa[x]); }
void merge(int x, int y)
{
    x = find(x);
    y = find(y);
    if (x != y)
        fa[x] = y;
}
int count(int n)
{
    int cnt = 0;
    for (int i = 1; i <= n; i++)
        if (fa[i] == i)
            cnt++;
    return cnt;
}

int main()
{
    int n, m;
    while (cin >> n >> m)
    {
        init(n);
        for (int i = 1; i <= m; i++)
        {
            int x, y;
            cin >> x >> y;
            merge(x, y);
        }
        int cnt = 0;
        for (int i = 1; i <= n; i++)
        {
            if (find(0) != find(i))
                cnt++;
        }
        cout << cnt << "\n";
    }
    return 0;
}
```

## Problem D

### Problem Description

小明非常喜欢AC这两个字母，有一天，大膜王把小明困在一个只有WA两种字母的迷宫里，并且大膜王给小明设置了一个难题，只有小明计算出自己所能够到达的格子数目才能够从WA迷宫中逃出。
已知在WA迷宫中，小明如果在W格子上，则可以移动到相邻四格中的A格子上；如果在A格子上，则可以移动到相邻四格中的W格子上。

### Input

有多组测试数据。
第1行为两个正整数n,m。
下面n行，每行n个字符，字符只可能是W或者A，字符之间没有空格。
接下来m行，每行2个用空格分隔的正整数i,j，对应了迷宫中第i行第j列的一个格子，询问从这一格开始能移动到多少格。（包括起点）
（1<=n<100,1<=m<100)

### Output

m行，对于每个询问输出相应答案。

### Sample Input

```
2 2
WA
AW
1 1
2 2
```

### Sample Output

```
4
4
```

### code

```c++
#include <bits/stdc++.h>
using namespace std;
bool a[1005][1005], b[1005][1005];
int jg[1005][1005];
int m, n, x[4] = {1, -1, 0, 0}, y[4] = {0, 0, 1, -1}, sx, sy, tot;
queue<int> c;
void bfs()
{
    memset(b, 0, sizeof(b));
    tot = 1;
    c.push(sx);
    c.push(sy);
    b[sx][sy] = 1;
    while (!c.empty())
    {
        int p = c.front();
        c.pop();
        int q = c.front();
        c.pop();
        // 如果已经搜索过了
        if (jg[p][q])
        {
            tot = jg[p][q];
            return;
        }
        for (int i = 0; i <= 3; ++i)
        {
            if (p + x[i] >= 1 && p + x[i] <= n && q + y[i] >= 1 && q + y[i] <= n && !b[p + x[i]][q + y[i]] && a[p][q] ^ a[p + x[i]][q + y[i]])
            {
                b[p + x[i]][q + y[i]] = 1;
                c.push(p + x[i]);
                c.push(q + y[i]);
                ++tot;
            }
        }
    }
    for (int i = 1; i <= n; ++i)
        for (int j = 1; j <= n; ++j)
        {
            if (b[i][j])
                jg[i][j] = tot;
        }
}
int main()
{
    char fz;
    
    cin >> n >> m;
    while (scanf("%d %d", &n, &m) != EOF ) {
    memset(a, 0, sizeof(a));
    memset(b, 0, sizeof(a));
    memset(jg, 0, sizeof(jg));
    for (int i = 1; i <= n; ++i)
        for (int j = 1; j <= n; ++j)
        {
            cin >> fz;
            if (fz == 'W')
                a[i][j] = 0;
            else if (fz == 'A')
                a[i][j] = 1;
        }
    for (int i = 1; i <= m; ++i)
    {
        cin >> sx >> sy;
        bfs();
        cout << tot << endl;
    }
    }
    return 0;
}
```

## Problem E

### Problem Description

小老鼠准备了M磅的猫粮，准备去和看守仓库的猫做交易，因为仓库里有小老鼠喜欢吃的五香豆。
仓库有N个房间；
第i个房间有J[i] 磅的五香豆，需要用F[i]磅的猫粮去交换；
需要指出的是：
1、老鼠如果要和某个房间的猫做交易，就必须交换该房间所有的五香豆！
2、还有个特殊的情况，小老鼠有强迫症——它一定要把自己所有的猫粮都用完才行！
现在，请帮忙计算一下，在必须用完所有的猫粮的前提下，小老鼠通过交易最多能够得到多少磅的五香豆？

### Input

输入包含多组测试用例。
每组测试数据首先一行是2个非负整数M和N，接着的N行，每行分别包含2个非负整数J[i]和F[i]，数据的具体含义详见题目描述。
输入数据以两个-1结束。
题目保证所有的数据都不超过1000.

### Output

请计算并输出小老鼠最多能够得到的五香豆数量，如果不能满足小老鼠的强迫症，请输出-1；
每组数据输出一行。

### Sample Input

```
5 3
7 2
4 3
5 2
20 3
25 18
24 15
15 10
-1 -1
```

### Sample Output

```c++
11
-1
```

### code

```
#include <bits/stdc++.h>
using namespace std;
int main()
{
    int w[1005], v[1005];
    int f[1005];
    int m, n;
    while (cin >> m >> n)
    {
        if (m == -1 && n == -1)
            return 0;
        // 初始化为负无穷    
        memset(f, 0xaf, sizeof(f));
        memset(w, 0, sizeof(w));
        memset(v, 0, sizeof(v));
        f[0] = 0;
        for (int i = 0; i < n; i++)
        {
            cin >> w[i] >> v[i];
        }
        for (int i = 0; i <= n; i++)
        {
            for (int j = m; j >= v[i]; j--)
            {
                f[j] = max(f[j], f[j - v[i]] + w[i]);
            }
        }
        if (f[m] < 0)
            cout << "-1" << endl;
        else
            cout << f[m] << endl;
    }
}
```

## Problem F

### Problem Description

还记得上次那个奋勇争先的题目吗，聪明的你帮助老师找出了第一名的同学。

现在，有个类似的问题：
已知每一位同学的解题数量和罚时，这次希望你能输出排名靠前的若干同学的名单。

注：
排名首先依据做题数量，若做题数量相同，则比较罚时，罚时少的排名靠前。

### Input

第一行是数据组数C，代表有C组测试实例。

每一组数据第一行两个整数N和M，N代表有N个人的成绩，M表示老师需要你输出前M名的名单。

接下来N行，每一行依次给出名字Name，做出的题目数量num和罚时time
( 1<=C<=10, 2<M<=N<=1000, Name的长度最大为10，1<=num<=10， 10<=time<=100000 )

### Output

每组测试数据输出M行，第i行为第i名的名字、解题数量和罚时，中间用空格隔开。

每组数据后空一行。

### Sample Input

```
1
3 3
Bob 5 50
Alice 4 46
John 5 48
```

### Sample Output

```
John 5 48
Bob 5 50
Alice 4 46
```

### code

```c++
#include <iostream>
#include <algorithm>
#include <cstring>
using namespace std;

struct student
{
    char name[10];
    int num;
    int time;
} stu[1000];

bool compare(student a, student b)
{
    if (a.num < b.num)
    {
        return a.num > b.num;
    }
    else if (a.num == b.num)
    {
        return a.time < b.time;
    }
}

int main()
{
    int c, m, n, i;
    scanf("%d", &c);
    while (c--)
    {
        scanf("%d %d", &n, &m);
        for (i = 0; i < n; i++)
            scanf("%s%d%d", stu[i].name, &stu[i].num, &stu[i].time);
        sort(stu, stu + n, compare);
        for (i = 0; i < m; i++)
            printf("%s %d %d\n", stu[i].name, stu[i].num, stu[i].time);
        printf("\n");
    }
    return 0;
}
```

