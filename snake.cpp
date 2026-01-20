#include <iostream>
#include <conio.h>
#include <windows.h>
using namespace std;

bool gameOver;
const int width = 40;
const int height = 20;
int x, y;
int foodX, foodY;
int score;

enum eDirection { STOP = 0, LEFT, RIGHT, UP, DOWN };
eDirection dir;

int tailX[100], tailY[100];
int nTail;

void Setup() {
    gameOver = false;
    dir = STOP;
    x = width / 2;
    y = height / 2;
    foodX = rand() % (width - 2) + 1;
    foodY = rand() % (height - 2) + 1;
    score = 0;
}

void Draw() {
    system("cls");

    cout << "==============================\n";
    cout << "        SNAKE GAME\n";
    cout << "     Created by d4rsh7n\n";
    cout << "==============================\n\n";

    for (int i = 0; i < width + 2; i++)
        cout << "#";
    cout << endl;

    for (int i = 0; i < height; i++) {
        for (int j = 0; j < width; j++) {
            if (j == 0)
                cout << "#";

            if (i == y && j == x)
                cout << "O";        // Head
            else if (i == foodY && j == foodX)
                cout << "F";        // Food
            else {
                bool printTail = false;
                for (int k = 0; k < nTail; k++) {
                    if (tailX[k] == j && tailY[k] == i) {
                        cout << "o"; // Tail
                        printTail = true;
                        break;
                    }
                }
                if (!printTail)
                    cout << " ";
            }

            if (j == width - 1)
                cout << "#";
        }
        cout << endl;
    }

    for (int i = 0; i < width + 2; i++)
        cout << "#";
    cout << endl;

    cout << "\nScore: " << score << endl;
    cout << "Controls: W A S D | X to quit" << endl;
    cout << "Created by d4rsh7n" << endl;
}

void Input() {
    if (_kbhit()) {
        switch (_getch()) {
        case 'a':
            dir = LEFT;
            break;
        case 'd':
            dir = RIGHT;
            break;
        case 'w':
            dir = UP;
            break;
        case 's':
            dir = DOWN;
            break;
        case 'x':
            gameOver = true;
            break;
        default:
            break;
        }
    }
}

void Logic() {
    int prevX = tailX[0];
    int prevY = tailY[0];
    int prev2X, prev2Y;
    tailX[0] = x;
    tailY[0] = y;

    for (int i = 1; i < nTail; i++) {
        prev2X = tailX[i];
        prev2Y = tailY[i];
        tailX[i] = prevX;
        tailY[i] = prevY;
        prevX = prev2X;
        prevY = prev2Y;
    }

    switch (dir) {
    case LEFT:
        x--;
        break;
    case RIGHT:
        x++;
        break;
    case UP:
        y--;
        break;
    case DOWN:
        y++;
        break;
    default:
        break;
    }

    // Wall collision
    if (x >= width || x < 0 || y >= height || y < 0) {
        gameOver = true;
    }

    // Self collision
    for (int i = 0; i < nTail; i++) {
        if (tailX[i] == x && tailY[i] == y) {
            gameOver = true;
        }
    }

    // Eating food
    if (x == foodX && y == foodY) {
        score += 10;
        foodX = rand() % (width - 2) + 1;
        foodY = rand() % (height - 2) + 1;
        nTail++;
    }
}

int main() {
    cout << "==============================\n";
    cout << "        SNAKE GAME\n";
    cout << "     Created by d4rsh7n\n";
    cout << "==============================\n";
    cout << "Press any key to start...\n";
    _getch();

    Setup();
    while (!gameOver) {
        Draw();
        Input();
        Logic();
        Sleep(100); // speed control
    }

    system("cls");
    cout << "==============================\n";
    cout << "        GAME OVER\n";
    cout << "     Created by d4rsh7n\n";
    cout << "==============================\n";
    cout << "Final Score: " << score << endl;
    system("pause");
    return 0;
}
