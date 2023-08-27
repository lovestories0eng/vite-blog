---
title: ACM-test-first
top: false
cover: false
toc: true
mathjax: true
date: 2021-12-26 20:13:53
password:
summary: ACM期末考试（一）
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

有一天，小猪佩奇去堂姐家玩，认识了两个新朋友，分别是松鼠西蒙和小熊贝琳达。佩奇和新朋友一起做蛋糕，佩奇做了一个正方形的蛋糕，西蒙做了一个长方形的蛋糕，贝琳达做了一个三角形的蛋糕。

现在，他们想知道谁做的蛋糕面积最大，但是他们不会算蛋糕的面积大小，他们决定求助你来解决这个问题。

### Input

第一行是数据组数N，代表有N组测试实例。

接下来有N行，每行有五个整数A,B,C,D,E（0<A,B,C,D,E<100）。
其中A代表小猪佩奇正方形蛋糕的边长。
B,C代表松鼠西蒙长方形蛋糕的长和宽。
D,E代表小熊贝琳达三角形蛋糕的底和高。

### Output

如果小猪佩奇的蛋糕最大，输出“Perch”
如果松鼠西蒙的蛋糕最大，输出“Semon”
如果小熊贝琳达的蛋糕最大，输出“Belinda”
每个测试实例结果占一行，数据确保三个蛋糕大小各不相同。

### Sample Input

```
3
2 1 5 2 3
5 4 6 7 8
6 2 3 4 5
```

### Sample Output

```
Semon
Belinda
Perch
```

### code

```c++
#include<bits/stdc++.h>

int main() {
    int cases, a, b, c, d, e;
    double x, y, z;
    scanf("%d", &cases);
    while(cases--) {
        scanf("%d", &a);
        scanf("%d", &b);
        scanf("%d", &c);
        scanf("%d", &d);
        scanf("%d", &e);
        x = a * a;
        y = b * c;
        z = 0.5 * d * e;
        if(x > y && x > z)
            printf("Perch\n");
        else if (y > x && y > z)
            printf("Semon\n");
        else
            printf("Belinda\n");
        
    }
    return 0;
}
```

## Problem B

### Problem Description

说到排序，我们都知道这是编程人员必备的知识，更不用说信奥了。

朱逸天，丁爸编程培训班的首期学员，尽管0基础开始，但是进步很大，已经熟练掌握了各种排序的实现。

现在，朱逸天专门准备了这么一个题目，想测试一下同班同学的你，看看你是否也熟练掌握了排序。


假设丁爸信奥培训班共有N（N<100）名同学，已知各位同学的详细信息（姓名，年龄，分数），现在请对培训班的全体同学做一个排序。

排序的规则要求如下：
1、首先按照分数从高到低进行排序；
2、如果分数相同，则年龄小的排名靠前；
3、如果依然不能区分，再按照姓名的字典序排列；

考验你的时候到了，你是否能像朱逸天一样熟练掌握排序呢？

### Input

输入包含多组测试用例；

每组数据首先是一个正整数N，表示培训班有N位同学，每位同学的信息占一行，依次是姓名Name、年龄Age和分数Score。

其中，姓名Name是长度不超过10的无空格字符串，年龄Age是不大于20的正整数，分数Score是不超过100的浮点数。

### Output

请输出排序后的全班同学信息，其中，分数保留2位小数。
格式参见样例。

### Sample Input

```
6
jaa 18 99.5
bbb 19 100
kcc 19 99
tdd 20 100
abc 18 100
see 19 100
```

### Sample Output

```
abc 18 100.00
bbb 19 100.00
see 19 100.00
tdd 20 100.00
jaa 18 99.50
kcc 19 99.00
```

### code

```c++
#include<iostream>
#include<algorithm>
#include<stdio.h>
#include<string.h>
#define LL long long
#define exp 1e-9
#define MAXN 1000010
 
using namespace std;
 
struct node{
	char name[101];
	int age;
	float grade;
}stu[1003];
 
bool cmp(node a,node b)
{
	if(a.grade != b.grade)
		return a.grade > b.grade;
	else {
        if(a.age != b.age)
			return a.age < b.age;
		else
			return strcmp(a.name,b.name) < 0;
	}
}
 
int main()
{
    int N,i;
    while(scanf("%d",&N)!=EOF)
    {
    	for(i=0;i<N;i++)
    	{
    		scanf("%s %d %f",&stu[i].name,&stu[i].age,&stu[i].grade);
		}
		sort(stu,stu+N,cmp);
		for(i=0;i<N;i++)
		{
			printf("%s %d %.2f\n",stu[i].name,stu[i].age,stu[i].grade);
		}
	}
    return 0;
}
```

## Problem C

### Problem Description

一丁小朋友最近迷上了密码，并且认为自己设计了一套“高级密码”。

当然，因为他实在太小了，他所谓的“高级密码”其实非常简单：
只要把字符倒序输出就能解密了~

### Input

输入首先包括一个正整数N，表示有N组测试用例。
每组数据占一行，包含一个长度不超过50的字符串。

### Output

请输出解密后的字符串，每组数据占一行。

### Sample Input

```
2
!uiLoaL ,olleH
!iahneW rof gnithgiF
```

### Sample Output

```
Hello, LaoLiu!
Fighting for Wenhai!
```

### code

```c++
#include<iostream>
#include<stdlib.h>
#include<string.h>
using namespace std; 
int main() {
    int n,i,j;
    char ch1[55],ch2[55];
    scanf("%d",&n);
    //如果不加这一句，那么会将输入n后的回车当成ch1
    getchar();
    while(n--)
    {
        gets(ch1);
        for(i=0;ch1[i]!='\0';i++);
        i--;
        for(j=0;i!=-1;j++,i--)
        {
            ch2[j] = ch1[i];
        }
        ch2[j] = '\0';
        puts(ch2);
    }
}
```

## Problem D

### Problem Description

给出两个已化为最简的分数 a/b , c/d ，请编程计算并输出这两个分数的乘积化简后的结果 e/f，题目保证所有的数均是1000范围内的正整数。

### Input

数据的第一行是一个正整数C，表示一共有C组测试用例。

接下来有C行数据，每行有四个正整数 a b c d。

### Output

输出这两个分数的乘积化简后的结果，分子为e，分母为f，中间用空格隔开，每个测试用例占一行。

### Sample Input

```
2
1 2 2 3
1 2 1 2
```

### Sample Output

```
1 3
1 4
```

### code

```c++
#include<bits/stdc++.h>

int main() {
    int cases, a, b, c, d;
    int x, y;
    scanf("%d", &cases);
    while(cases--) {
        scanf("%d %d %d %d", &a, &b, &c, &d);
        x = a * c;
        y = b * d;
        for(int i=x;i>=1;i--) {
		    if((x % i == 0) && (y%i == 0)) {
			    x = x/i;
			    y = y/i;
		    }
	    }
        printf("%d %d\n", x, y);
    }
    return 0;
}
```

## Problem E

### Problem Description

为情所困退学在家的钱哥毅然决定养猪！

在2010年1月1日，他买了一只刚出生的母猪幼仔，假设每只小母猪从第3个年头开始，每年的第一天都会生出4只小母猪，同时，钱哥会在每年的12月31日售出所有差一天就要年满5周岁的猪。

请计算：在第N年（2010年是第1年，2011是第2年，依次类推）的今天（5月4日），钱哥的养猪场会存栏多少只猪?

### Input

输入数据第一行是一个整数T(0<T<=40)，表示测试数据的组数.
接下来有T行，每行有一个数N(0<N<=40)表示一组测试数据，其含义如题目描述。

### Output

对于每个测试实例，请输出在第N年的今天母猪的数量，每组数据的输出占一行。

### Sample Input

```
3
2
3
5
```

### Sample Output

```
1
5
29
```

### code

```c++
#include <bits/stdc++.h>

using namespace std;
typedef long long ll;

const int maxn = 45;
int dp[maxn], ans[maxn];

int main(int argc, char **argv) {
    fill(dp, dp + maxn, 0);
    fill(ans, ans + maxn, 0);
    dp[1] = 1;
    dp[2] = 0;
    dp[3] = 4;
    dp[4] = 4;
    dp[5] = 20;
    ans[1] = 1;
    ans[2] = 1;
    ans[3] = 5, ans[4] = 9, ans[5] = 29;
    for (int i = 6; i <= 40; i++) {
        // 母猪在五岁前一天售出，只有3岁以上的母猪可以生出小母猪
        for (int j = i - 4; j <= i - 2; j++) {
            dp[i] += dp[j] * 4;
        }
        // 加上小猪，减去已出售的母猪
        ans[i] = ans[i - 1] + dp[i] - dp[i - 5];
    }
    int T, n;
    while (~scanf("%d", &T)) {
        while (T--) {
            scanf("%d", &n);
            printf("%d\n", ans[n]);
        }
    }
    return 0;
}
```

## Problem F

### Problem Description

一个数，如果他的素数因子只包括2,3,5,7，则称这个数为萌数，比如，下面这些数就是前20个萌数：1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 12, 14, 15, 16, 18, 20, 21, 24, 25, 27。

现在给你一个萌数，请编程计算它的约数的个数。
比如，4是一个萌数，他有3个约数(1,2,4)；12也是一个萌数，他有 6 个约数（1,2,3,4,6,12）。

### Input

输入包含多组测试用例。
每个测试用例包含一个萌数n, 并且n在64位整数的范围( long long 类型，输入输出用%lld )。
如果n为0，则标志结束输入，不做处理。

### Output

对于每个测试用例中的萌数，请输出他的约数的个数。
每个输出占一行。

### Sample Input

```
4
12
0
```

### Sample Output

```
3
6
```

```c++
#include <iostream>

typedef long long ll;
using namespace std;
ll n;

int main() {
    while (cin >> n) {
        if (n == 0) break;
        // 1一定是约数
        ll a1 = 1, a2 = 1, a3 = 1, a4 = 1;
        while (n % 2 == 0) {
            a1++;
            n /= 2;
        }
        while (n % 3 == 0) {
            a2++;
            n /= 3;
        }
        while (n % 5 == 0) {
            a3++;
            n /= 5;
        }
        while (n % 7 == 0) {
            a4++;
            n /= 7;
        }
        ll ans = a1 * a2 * a3 * a4;
        cout << ans << endl;
    }
    return 0;
}
```

## Problem G

### Problem Description

一丁三年级的时候学会了跳棋，但一直到现在都没能赢过丁爸（毕竟是棋王~）。

刚好，一丁最近学会了bfs，就打算写一个小程序帮助自己打破零胜的记录。

在一个n*m的矩形棋盘上，一丁想要走动的棋子的坐标是x1,y1,想要棋子到达的坐标是x2,y2。棋子只能往上下左右四个方向走，如果棋子某一方向上相邻的位置没有别的棋子，那就可以直接走一步到达相邻位置，并且走的次数加一，如果走的方向上相邻位置有别的棋子，那也可以直接跳过去，但是只能跳过一个棋子，也就是相当于往一个方向走了两步，并且走的次数还是加一，不过这种情况必须要保证棋子跳到的位置没有别的棋子。

在已知棋盘信息和想要移动的棋子的起点坐标和终点坐标后，一丁希望输出最少走的次数，如果不能走到终点，则输出-1。

### Input

题目有多组输入。

每组数据第一行是两个整数n（1<=n<=10）和m(1<=m<=10)，分别表示矩形棋盘的行数和列数。

接下来一共有n行，每行m个字符。只包含‘.’和‘*’两种字符。其中，‘.’表示这个位置没有棋子，‘*’表示这个位置有棋子。

最后还有一行包含四个正整数x1,y1,x2,y2,分别表示棋子起点的行列坐标和棋子最后想要到达的行列坐标。

题目保证1<=x1,x2<=n, 1<=y1,y2<=m，并且（x1，y1）位置上肯定是‘*’，（x2,y2）上肯定是‘.’。

### Output

输出棋子从（x1,y1）到（x2,y2）的最小步数，如果不能到达则输出-1。

### Sample Input

```
3 3
*..
.*.
...
1 1 3 3

3 3
*.*
..*
**.
1 1 3 3
```

### Sample Output

```
3
-1
```

```c++
#include<bits/stdc++.h>

using namespace std;
char a[20][20];
int d[20][20];
// dx和dy组合起来对应上下左右四个方向
int dx[4] = {1, -1, 0, 0};
int dy[4] = {0, 0, -1, 1};

int main() {
    int n, m;
    while (cin >> n >> m && n && m) {
        for (int i = 1; i <= n; i++)
            for (int j = 1; j <= m; j++)
                cin >> a[i][j];
        int sx, sy, ex, ey;
        cin >> sx >> sy >> ex >> ey;

        // void *memset(void *s, int c, unsigned long n);
        // 将指针变量 s 所指向的前 n 字节的内存单元用一个“整数” c 替换，
        // 注意 c 是 int 型。s 是 void* 型的指针变量，所以它可以为任何类型的数据进行初始化。
        memset(d, -1, sizeof(d));
        d[sx][sy] = 0;
        // 队列结构，<x,y>组成一组坐标
        queue <pair<int, int>> q;
        q.push(make_pair(sx, sy));
        // 当队列不为空时，进行BFS
        while (q.size()) {
            // 取出队列中的第一个元素x坐标和y坐标
            int x = q.front().first, y = q.front().second;
            q.pop();
            // d[nx][ny] == -1用于判断该点是否被走过
            for (int i = 0; i < 4; i++) {
                int nx = x + dx[i], ny = y + dy[i];
                // 棋子某一方向上相邻的位置没有别的棋子
                if (nx >= 1 && nx <= n && ny >= 1 && ny <= m && a[nx][ny] == '.' && d[nx][ny] == -1) {
                    d[nx][ny] = d[x][y] + 1;
                    q.push(make_pair(nx, ny));
                } else if (nx >= 1 && nx <= n && ny >= 1 && ny <= m && a[nx][ny] == '*' && d[nx][ny] == -1) {
                    nx = nx + dx[i];
                    ny = ny + dy[i];
                    // 走的方向上相邻位置有别的棋子，并且棋子跳到的位置没有别的棋子，则跳过一个棋子
                    if (nx >= 1 && nx <= n && ny >= 1 && ny <= m && a[nx][ny] == '.' && d[nx][ny] == -1) {
                        d[nx][ny] = d[x][y] + 1;
                        q.push(make_pair(nx, ny));
                    }
                }
            }
        }
        cout << d[ex][ey] << "\n";
    }
    return 0;
}
```

