---
problemNumber: 11
title: "Largest Product in a Grid"
description: "In the 20×20 grid below, four numbers along a diagonal line have been marked in red. (The grid is given in the problem.) The product of these numbers is 26 × 63 × 78 × 14 = 1788696. What is the greatest product of four adjacent numbers in the same direction (up, down, left, right, or diagonally) in the 20×20 grid? Answer: 70600674"
difficulty: "medium"
date: 2026-03-10
technologies: ["cpp", "java", "javascript", "python", "ruby", "go", "rust"]
implementations:
  - language: "cpp"
    code: |
      // https://projecteuler.net/problem=11
      // Largest product in a grid
      //
      // In the 20×20 grid below, four numbers along a diagonal line have been marked in red.
      //
      //  8  2 22 97 38 15 00 40 00 75  4  5  7 78 52 12 50 77 91  8
      // 49 49 99 40 17 81 18 57 60 87 17 40 98 43 69 48  4 56 62 00
      // 81 49 31 73 55 79 14 29 93 71 40 67 53 88 30  3 49 13 36 65
      // 52 70 95 23  4 60 11 42 69 24 68 56  1 32 56 71 37  2 36 91
      // 22 31 16 71 51 67 63 89 41 92 36 54 22 40 40 28 66 33 13 80
      // 24 47 32 60 99  3 45  2 44 75 33 53 78 36 84 20 35 17 12 50
      // 32 98 81 28 64 23 67 10 *26 38 40 67 59 54 70 66 18 38 64 70
      // 67 26 20 68  2 62 12 20 95 *63 94 39 63  8 40 91 66 49 94 21
      // 24 55 58  5 66 73 99 26 97 17 *78 78 96 83 14 88 34 89 63 72
      // 21 36 23  9 75 00 76 44 20 45 35 *14 00 61 33 97 34 31 33 95
      // 78 17 53 28 22 75 31 67 15 94  3 80  4 62 16 14  9 53 56 92
      // 16 39  5 42 96 35 31 47 55 58 88 24 00 17 54 24 36 29 85 57
      // 86 56 00 48 35 71 89  7  5 44 44 37 44 60 21 58 51 54 17 58
      // 19 80 81 68  5 94 47 69 28 73 92 13 86 52 17 77  4 89 55 40
      //  4 52  8 83 97 35 99 16  7 97 57 32 16 26 26 79 33 27 98 66
      // 88 36 68 87 57 62 20 72  3 46 33 67 46 55 12 32 63 93 53 69
      //  4 42 16 73 38 25 39 11 24 94 72 18  8 46 29 32 40 62 76 36
      // 20 69 36 41 72 30 23 88 34 62 99 69 82 67 59 85 74  4 36 16
      // 20 73 35 29 78 31 90  1 74 31 49 71 48 86 81 16 23 57  5 54
      //  1 70 54 71 83 51 54 69 16 92 33 48 61 43 52  1 89 19 67 48
      // The product of these numbers is 26 × 63 × 78 × 14 = 1788696.
      //
      // What is the greatest product of four adjacent numbers in the same direction (up, down, left, right, or diagonally) in the 20×20 grid?
      
      // Answer: 70600674
      
      #include <iomanip>
      #include <iostream>
      
      #include <cmath>
      #include <cstdint>
      
      static const int grid[] =
      {
       8, 2,22,97,38,15, 0,40, 0,75, 4, 5, 7,78,52,12,50,77,91, 8,
      49,49,99,40,17,81,18,57,60,87,17,40,98,43,69,48, 4,56,62,00,
      81,49,31,73,55,79,14,29,93,71,40,67,53,88,30, 3,49,13,36,65,
      52,70,95,23, 4,60,11,42,69,24,68,56, 1,32,56,71,37, 2,36,91,
      22,31,16,71,51,67,63,89,41,92,36,54,22,40,40,28,66,33,13,80,
      24,47,32,60,99, 3,45, 2,44,75,33,53,78,36,84,20,35,17,12,50,
      32,98,81,28,64,23,67,10,26,38,40,67,59,54,70,66,18,38,64,70,
      67,26,20,68, 2,62,12,20,95,63,94,39,63, 8,40,91,66,49,94,21,
      24,55,58, 5,66,73,99,26,97,17,78,78,96,83,14,88,34,89,63,72,
      21,36,23, 9,75,00,76,44,20,45,35,14,00,61,33,97,34,31,33,95,
      78,17,53,28,22,75,31,67,15,94, 3,80, 4,62,16,14, 9,53,56,92,
      16,39, 5,42,96,35,31,47,55,58,88,24,00,17,54,24,36,29,85,57,
      86,56,00,48,35,71,89, 7, 5,44,44,37,44,60,21,58,51,54,17,58,
      19,80,81,68, 5,94,47,69,28,73,92,13,86,52,17,77, 4,89,55,40,
       4,52, 8,83,97,35,99,16, 7,97,57,32,16,26,26,79,33,27,98,66,
      88,36,68,87,57,62,20,72, 3,46,33,67,46,55,12,32,63,93,53,69,
       4,42,16,73,38,25,39,11,24,94,72,18, 8,46,29,32,40,62,76,36,
      20,69,36,41,72,30,23,88,34,62,99,69,82,67,59,85,74, 4,36,16,
      20,73,35,29,78,31,90, 1,74,31,49,71,48,86,81,16,23,57, 5,54,
       1,70,54,71,83,51,54,69,16,92,33,48,61,43,52, 1,89,19,67,48
      };
      
      uint64_t largest_grid_product_brute()
      {
        uint64_t max = 0;
        for( size_t i = 0 ; i < 400; i++ ){
          int r = std::floor(i/20);
          int c = ((i-(r*20))%20);
      
          uint64_t rl_sum = 0;
          uint64_t ud_sum = 0;
          uint64_t f_diag_sum = 0;
          uint64_t b_diag_sum = 0;
      
          if( c < 17 ){
            rl_sum = grid[i] *
                      grid[i+1] *
                      grid[i+2] *
                      grid[i+3];
      
            max = std::max(rl_sum,max);
      
            if( r < 17 ){
              f_diag_sum = grid[i] *
                            grid[i+21] *
                            grid[i+42] *
                            grid[i+63];
      
              max = std::max(f_diag_sum,max);
            }
          }
      
          if( r < 17 ){
            ud_sum = grid[i] *
                      grid[i+20] *
                      grid[i+40] *
                      grid[i+60];
      
            max = std::max(ud_sum,max);
      
            if( c > 3 ){
              b_diag_sum = grid[i] *
                        grid[i+19] *
                        grid[i+38] *
                        grid[i+57];
      
              max = std::max(b_diag_sum,max);
            }
      
            // std::cout << '[' << std::setw(3) << i
            //             << "](" << r << '/' << c
            //             << ")rl[" << rl_sum
            //             << "]ud[" << ud_sum
            //             << "]fd[" << f_diag_sum
            //             << "]bd[" << b_diag_sum
            //             << "]=" << max
            //             << std::endl;
          }
        }
        return max;
      }
      
      #if ! defined UNITTEST_MODE
      int main(int argc, char const *argv[])
      {
        std::cout << "Answer: " << largest_grid_product_brute() << std::endl;
      }
      #endif // #if ! defined UNITTEST_MODE
    githubLink: "https://github.com/tvarley/euler/blob/master/cpp/src/euler011.cpp"
    performance: "O(n) time complexity"
  - language: "java"
    code: |
      package org.tvarley.euler.solutions;
      
      import org.tvarley.euler.Solution;
      
      public class Solution011 implements Solution {
        private static final int[][] GRID = {
          {8,2,22,97,38,15,0,40,0,75,4,5,7,78,52,12,50,77,91,8},
          {49,49,99,40,17,81,18,57,60,87,17,40,98,43,69,48,4,56,62,0},
          {81,49,31,73,55,79,14,29,93,71,40,67,53,88,30,3,49,13,36,65},
          {52,70,95,23,4,60,11,42,69,24,68,56,1,32,56,71,37,2,36,91},
          {22,31,16,71,51,67,63,89,41,92,36,54,22,40,40,28,66,33,13,80},
          {24,47,32,60,99,3,45,2,44,75,33,53,78,36,84,20,35,17,12,50},
          {32,98,81,28,64,23,67,10,26,38,40,67,59,54,70,66,18,38,64,70},
          {67,26,20,68,2,62,12,20,95,63,94,39,63,8,40,91,66,49,94,21},
          {24,55,58,5,66,73,99,26,97,17,78,78,96,83,14,88,34,89,63,72},
          {21,36,23,9,75,0,76,44,20,45,35,14,0,61,33,97,34,31,33,95},
          {78,17,53,28,22,75,31,67,15,94,3,80,4,62,16,14,9,53,56,92},
          {16,39,5,42,96,35,31,47,55,58,88,24,0,17,54,24,36,29,85,57},
          {86,56,0,48,35,71,89,7,5,44,44,37,44,60,21,58,51,54,17,58},
          {19,80,81,68,5,94,47,69,28,73,92,13,86,52,17,77,4,89,55,40},
          {4,52,8,83,97,35,99,16,7,97,57,32,16,26,26,79,33,27,98,66},
          {88,36,68,87,57,62,20,72,3,46,33,67,46,55,12,32,63,93,53,69},
          {4,42,16,73,38,25,39,11,24,94,72,18,8,46,29,32,40,62,76,36},
          {20,69,36,41,72,30,23,88,34,62,99,69,82,67,59,85,74,4,36,16},
          {20,73,35,29,78,31,90,1,74,31,49,71,48,86,81,16,23,57,5,54},
          {1,70,54,71,83,51,54,69,16,92,33,48,61,43,52,1,89,19,67,48}
        };
      
        public String solve() {
          long maxProduct = 0;
      
          // Horizontal
          for (int i = 0; i < 20; i++) {
            for (int j = 0; j < 17; j++) {
              long product = (long) GRID[i][j] * GRID[i][j+1] * GRID[i][j+2] * GRID[i][j+3];
              maxProduct = Math.max(maxProduct, product);
            }
          }
      
          // Vertical
          for (int i = 0; i < 17; i++) {
            for (int j = 0; j < 20; j++) {
              long product = (long) GRID[i][j] * GRID[i+1][j] * GRID[i+2][j] * GRID[i+3][j];
              maxProduct = Math.max(maxProduct, product);
            }
          }
      
          // Diagonal \
          for (int i = 0; i < 17; i++) {
            for (int j = 0; j < 17; j++) {
              long product = (long) GRID[i][j] * GRID[i+1][j+1] * GRID[i+2][j+2] * GRID[i+3][j+3];
              maxProduct = Math.max(maxProduct, product);
            }
          }
      
          // Diagonal /
          for (int i = 0; i < 17; i++) {
            for (int j = 3; j < 20; j++) {
              long product = (long) GRID[i][j] * GRID[i+1][j-1] * GRID[i+2][j-2] * GRID[i+3][j-3];
              maxProduct = Math.max(maxProduct, product);
            }
          }
      
          return Long.toString(maxProduct);
        }
      }
    githubLink: "https://github.com/tvarley/euler/blob/master/java/src/main/java/org/tvarley/euler/solutions/Solution011.java"
  - language: "javascript"
    code: |
      const grid = [
        [08, 02, 22, 97, 38, 15, 00, 40, 00, 75, 04, 05, 07, 78, 52, 12, 50, 77, 91, 08],
        [49, 49, 99, 40, 17, 81, 18, 57, 60, 87, 17, 40, 98, 43, 69, 48, 04, 56, 62, 00],
        [81, 49, 31, 73, 55, 79, 14, 29, 93, 71, 40, 67, 53, 88, 30, 03, 49, 13, 36, 65],
        [52, 70, 95, 23, 04, 60, 11, 42, 69, 24, 68, 56, 01, 32, 56, 71, 37, 02, 36, 91],
        [22, 31, 16, 71, 51, 67, 63, 89, 41, 92, 36, 54, 22, 40, 40, 28, 66, 33, 13, 80],
        [24, 47, 32, 60, 99, 03, 45, 02, 44, 75, 33, 53, 78, 36, 84, 20, 35, 17, 12, 50],
        [32, 98, 81, 28, 64, 23, 67, 10, 26, 38, 40, 67, 59, 54, 70, 66, 18, 38, 64, 70],
        [67, 26, 20, 68, 02, 62, 12, 20, 95, 63, 94, 39, 63, 08, 40, 91, 66, 49, 94, 21],
        [24, 55, 58, 05, 66, 73, 99, 26, 97, 17, 78, 78, 96, 83, 14, 88, 34, 89, 63, 72],
        [21, 36, 23, 09, 75, 00, 76, 44, 20, 45, 35, 14, 00, 61, 33, 97, 34, 31, 33, 95],
        [78, 17, 53, 28, 22, 75, 31, 67, 15, 94, 03, 80, 04, 62, 16, 14, 09, 53, 56, 92],
        [16, 39, 05, 42, 96, 35, 31, 47, 55, 58, 88, 24, 00, 17, 54, 24, 36, 29, 85, 57],
        [86, 56, 00, 48, 35, 71, 89, 07, 05, 44, 44, 37, 44, 60, 21, 58, 51, 54, 17, 58],
        [19, 80, 81, 68, 05, 94, 47, 69, 28, 73, 92, 13, 86, 52, 17, 77, 04, 89, 55, 40],
        [04, 52, 08, 83, 97, 35, 99, 16, 07, 97, 57, 32, 16, 26, 26, 79, 33, 27, 98, 66],
        [88, 36, 68, 87, 57, 62, 20, 72, 03, 46, 33, 67, 46, 55, 12, 32, 63, 93, 53, 69],
        [04, 42, 16, 73, 38, 25, 39, 11, 24, 94, 72, 18, 08, 46, 29, 32, 40, 62, 76, 36],
        [20, 69, 36, 41, 72, 30, 23, 88, 34, 62, 99, 69, 82, 67, 59, 85, 74, 04, 36, 16],
        [20, 73, 35, 29, 78, 31, 90, 01, 74, 31, 49, 71, 48, 86, 81, 16, 23, 57, 05, 54],
        [01, 70, 54, 71, 83, 51, 54, 69, 16, 92, 33, 48, 61, 43, 52, 01, 89, 19, 67, 48]
      ];
      
      module.exports = {
        answer: () => {
          let maxProduct = 0;
      
          // Check horizontal
          for (let i = 0; i < 20; i++) {
            for (let j = 0; j < 17; j++) {
              const product = grid[i][j] * grid[i][j+1] * grid[i][j+2] * grid[i][j+3];
              if (product > maxProduct) maxProduct = product;
            }
          }
      
          // Check vertical
          for (let i = 0; i < 17; i++) {
            for (let j = 0; j < 20; j++) {
              const product = grid[i][j] * grid[i+1][j] * grid[i+2][j] * grid[i+3][j];
              if (product > maxProduct) maxProduct = product;
            }
          }
      
          // Check diagonal (top-left to bottom-right)
          for (let i = 0; i < 17; i++) {
            for (let j = 0; j < 17; j++) {
              const product = grid[i][j] * grid[i+1][j+1] * grid[i+2][j+2] * grid[i+3][j+3];
              if (product > maxProduct) maxProduct = product;
            }
          }
      
          // Check diagonal (top-right to bottom-left)
          for (let i = 0; i < 17; i++) {
            for (let j = 3; j < 20; j++) {
              const product = grid[i][j] * grid[i+1][j-1] * grid[i+2][j-2] * grid[i+3][j-3];
              if (product > maxProduct) maxProduct = product;
            }
          }
      
          return maxProduct;
        }
      };
    githubLink: "https://github.com/tvarley/euler/blob/master/javascript/src/euler/solution011.js"
  - language: "python"
    code: |
      def solve():
          """
          Largest product in a grid
          In the 20×20 grid below, four numbers along a diagonal line have been marked in red.
          The product of these numbers is 26 × 63 × 78 × 14 = 1788696.
          What is the greatest product of four adjacent numbers in the same direction
          (up, down, left, right, or diagonally) in the 20×20 grid?
          """
          grid = [
              [8, 2, 22, 97, 38, 15, 0, 40, 0, 75, 4, 5, 7, 78, 52, 12, 50, 77, 91, 8],
              [49, 49, 99, 40, 17, 81, 18, 57, 60, 87, 17, 40, 98, 43, 69, 48, 4, 56, 62, 0],
              [81, 49, 31, 73, 55, 79, 14, 29, 93, 71, 40, 67, 53, 88, 30, 3, 49, 13, 36, 65],
              [52, 70, 95, 23, 4, 60, 11, 42, 69, 24, 68, 56, 1, 32, 56, 71, 37, 2, 36, 91],
              [22, 31, 16, 71, 51, 67, 63, 89, 41, 92, 36, 54, 22, 40, 40, 28, 66, 33, 13, 80],
              [24, 47, 32, 60, 99, 3, 45, 2, 44, 75, 33, 53, 78, 36, 84, 20, 35, 17, 12, 50],
              [32, 98, 81, 28, 64, 23, 67, 10, 26, 38, 40, 67, 59, 54, 70, 66, 18, 38, 64, 70],
              [67, 26, 20, 68, 2, 62, 12, 20, 95, 63, 94, 39, 63, 8, 40, 91, 66, 49, 94, 21],
              [24, 55, 58, 5, 66, 73, 99, 26, 97, 17, 78, 78, 96, 83, 14, 88, 34, 89, 63, 72],
              [21, 36, 23, 9, 75, 0, 76, 44, 20, 45, 35, 14, 0, 61, 33, 97, 34, 31, 33, 95],
              [78, 17, 53, 28, 22, 75, 31, 67, 15, 94, 3, 80, 4, 62, 16, 14, 9, 53, 56, 92],
              [16, 39, 5, 42, 96, 35, 31, 47, 55, 58, 88, 24, 0, 17, 54, 24, 36, 29, 85, 57],
              [86, 56, 0, 48, 35, 71, 89, 7, 5, 44, 44, 37, 44, 60, 21, 58, 51, 54, 17, 58],
              [19, 80, 81, 68, 5, 94, 47, 69, 28, 73, 92, 13, 86, 52, 17, 77, 4, 89, 55, 40],
              [4, 52, 8, 83, 97, 35, 99, 16, 7, 97, 57, 32, 16, 26, 26, 79, 33, 27, 98, 66],
              [88, 36, 68, 87, 57, 62, 20, 72, 3, 46, 33, 67, 46, 55, 12, 32, 63, 93, 53, 69],
              [4, 42, 16, 73, 38, 25, 39, 11, 24, 94, 72, 18, 8, 46, 29, 32, 40, 62, 76, 36],
              [20, 69, 36, 41, 72, 30, 23, 88, 34, 62, 99, 69, 82, 67, 59, 85, 74, 4, 36, 16],
              [20, 73, 35, 29, 78, 31, 90, 1, 74, 31, 49, 71, 48, 86, 81, 16, 23, 57, 5, 54],
              [1, 70, 54, 71, 83, 51, 54, 69, 16, 92, 33, 48, 61, 43, 52, 1, 89, 19, 67, 48]
          ]
          max_prod = 0
          n = 20
          # right
          for i in range(n):
              for j in range(n - 3):
                  prod = grid[i][j] * grid[i][j+1] * grid[i][j+2] * grid[i][j+3]
                  max_prod = max(max_prod, prod)
          # down
          for i in range(n - 3):
              for j in range(n):
                  prod = grid[i][j] * grid[i+1][j] * grid[i+2][j] * grid[i+3][j]
                  max_prod = max(max_prod, prod)
          # diag down-right
          for i in range(n - 3):
              for j in range(n - 3):
                  prod = grid[i][j] * grid[i+1][j+1] * grid[i+2][j+2] * grid[i+3][j+3]
                  max_prod = max(max_prod, prod)
          # diag down-left
          for i in range(n - 3):
              for j in range(3, n):
                  prod = grid[i][j] * grid[i+1][j-1] * grid[i+2][j-2] * grid[i+3][j-3]
                  max_prod = max(max_prod, prod)
          return max_prod
    githubLink: "https://github.com/tvarley/euler/blob/master/python/src/euler011.py"
  - language: "ruby"
    code: |
      def largest_grid_product
        grid =
          [
            8, 2, 22, 97, 38, 15, 0, 40, 0, 75, 4, 5, 7, 78, 52, 12, 50, 77, 91, 8,
            49, 49, 99, 40, 17, 81, 18, 57, 60, 87, 17, 40, 98, 43, 69, 48, 4, 56, 62, 0o0,
            81, 49, 31, 73, 55, 79, 14, 29, 93, 71, 40, 67, 53, 88, 30, 3, 49, 13, 36, 65,
            52, 70, 95, 23, 4, 60, 11, 42, 69, 24, 68, 56, 1, 32, 56, 71, 37, 2, 36, 91,
            22, 31, 16, 71, 51, 67, 63, 89, 41, 92, 36, 54, 22, 40, 40, 28, 66, 33, 13, 80,
            24, 47, 32, 60, 99, 3, 45, 2, 44, 75, 33, 53, 78, 36, 84, 20, 35, 17, 12, 50,
            32, 98, 81, 28, 64, 23, 67, 10, 26, 38, 40, 67, 59, 54, 70, 66, 18, 38, 64, 70,
            67, 26, 20, 68, 2, 62, 12, 20, 95, 63, 94, 39, 63, 8, 40, 91, 66, 49, 94, 21,
            24, 55, 58, 5, 66, 73, 99, 26, 97, 17, 78, 78, 96, 83, 14, 88, 34, 89, 63, 72,
            21, 36, 23, 9, 75, 0o0, 76, 44, 20, 45, 35, 14, 0o0, 61, 33, 97, 34, 31, 33, 95,
            78, 17, 53, 28, 22, 75, 31, 67, 15, 94, 3, 80, 4, 62, 16, 14, 9, 53, 56, 92,
            16, 39, 5, 42, 96, 35, 31, 47, 55, 58, 88, 24, 0o0, 17, 54, 24, 36, 29, 85, 57,
            86, 56, 0o0, 48, 35, 71, 89, 7, 5, 44, 44, 37, 44, 60, 21, 58, 51, 54, 17, 58,
            19, 80, 81, 68, 5, 94, 47, 69, 28, 73, 92, 13, 86, 52, 17, 77, 4, 89, 55, 40,
            4, 52, 8, 83, 97, 35, 99, 16, 7, 97, 57, 32, 16, 26, 26, 79, 33, 27, 98, 66,
            88, 36, 68, 87, 57, 62, 20, 72, 3, 46, 33, 67, 46, 55, 12, 32, 63, 93, 53, 69,
            4, 42, 16, 73, 38, 25, 39, 11, 24, 94, 72, 18, 8, 46, 29, 32, 40, 62, 76, 36,
            20, 69, 36, 41, 72, 30, 23, 88, 34, 62, 99, 69, 82, 67, 59, 85, 74, 4, 36, 16,
            20, 73, 35, 29, 78, 31, 90, 1, 74, 31, 49, 71, 48, 86, 81, 16, 23, 57, 5, 54,
            1, 70, 54, 71, 83, 51, 54, 69, 16, 92, 33, 48, 61, 43, 52, 1, 89, 19, 67, 48
          ]
        answer = 0
        # rubocop:disable Metrics/BlockLength
        (0..399).each do |i|
          row = (i / 20).floor
          col = ((i - (row * 20)) % 20)
      
          if col < 17
            rl_sum = grid[i] *
              grid[i + 1] *
              grid[i + 2] *
              grid[i + 3]
            answer = [answer, rl_sum].max
      
            if row < 17
              f_diag_sum = grid[i] *
                grid[i + 21] *
                grid[i + 42] *
                grid[i + 63]
      
              answer = [answer, f_diag_sum].max
            end
          end
      
          next unless row < 17
      
          ud_sum = grid[i] *
            grid[i + 20] *
            grid[i + 40] *
            grid[i + 60]
      
          answer = [answer, ud_sum].max
      
          next unless col > 3
      
          b_diag_sum = grid[i] *
            grid[i + 19] *
            grid[i + 38] *
            grid[i + 57]
          answer = [answer, b_diag_sum].max
          # puts "[#{i}](#{row}/#{col})rl[#{rl_sum}]ud[#{ud_sum}]fd[#{f_diag_sum}]bd[#{b_diag_sum}]=#{answer}"
        end
        # rubocop:enable Metrics/BlockLength
        answer
      end
      
      puts largest_grid_product if __FILE__ == $PROGRAM_NAME
    githubLink: "https://github.com/tvarley/euler/blob/master/ruby/lib/euler011.rb"
  - language: "go"
    code: |
      package main
      
      import (
      
          "fmt"
      
          "strconv"
      
          "strings"
      
      )
      
      func main() {
      
          gridStr := `08 02 22 97 38 15 00 40 00 75 04 05 07 78 52 12 50 77 91 08
      
      49 49 99 40 17 81 18 57 60 87 17 40 98 43 69 48 04 56 62 00
      
      81 49 31 73 55 79 14 29 93 71 40 67 53 88 30 03 49 13 36 65
      
      52 70 95 23 04 60 11 42 69 24 68 56 01 32 56 71 37 02 36 91
      
      22 31 16 71 51 67 63 89 41 92 36 54 22 40 40 28 66 33 13 80
      
      24 47 32 60 99 03 45 02 44 75 33 53 78 36 84 20 35 17 12 50
      
      32 98 81 28 64 23 67 10 26 38 40 67 59 54 70 66 18 38 64 70
      
      67 26 20 68 02 62 12 20 95 63 94 39 63 08 40 91 66 49 94 21
      
      24 55 58 05 66 73 99 26 97 17 78 78 96 83 14 88 34 89 63 72
      
      21 36 23 09 75 00 76 44 20 45 35 14 00 61 33 97 34 31 33 95
      
      78 17 53 28 22 75 31 67 15 94 03 80 04 62 16 14 09 53 56 92
      
      16 39 05 42 96 35 31 47 55 58 88 24 00 17 54 24 36 29 85 57
      
      86 56 00 48 35 71 89 07 05 44 44 37 44 60 21 58 51 54 17 58
      
      19 80 81 68 05 94 47 69 28 73 92 13 86 52 17 77 04 89 55 40
      
      04 52 08 83 97 35 99 16 07 97 57 32 16 26 26 79 33 27 98 66
      
      15 08 44 37 98 66 91 78 17 35 94 19 21 03 51 93 54 81 78 31
      
      51 54 81 92 23 25 98 49 16 99 67 53 11 41 01 17 68 19 19 68
      
      46 47 89 82 62 39 35 06 06 44 13 87 72 06 75 87 57 75 84 74
      
      85 25 29 39 12 94 99 52 62 84 18 16 08 28 56 61 23 50 40 02
      
      21 77 22 31 11 03 94 42 40 51 19 18 96 81 02 36 43 84 09 17`
      
          lines := strings.Split(gridStr, "\n")
      
          var grid [][]int
      
          for _, line := range lines {
      
              line = strings.TrimSpace(line)
      
              if line == "" {
      
                  continue
      
              }
      
              parts := strings.Fields(line)
      
              row := make([]int, 20)
      
              for j, p := range parts {
      
                  row[j], _ = strconv.Atoi(p)
      
              }
      
              grid = append(grid, row)
      
          }
      
          maxProd := 0
      
          for i := 0; i < 20; i++ {
      
              for j := 0; j < 20; j++ {
      
                  // right
      
                  if j+3 < 20 {
      
                      prod := grid[i][j] * grid[i][j+1] * grid[i][j+2] * grid[i][j+3]
      
                      if prod > maxProd {
      
                          maxProd = prod
      
                      }
      
                  }
      
                  // down
      
                  if i+3 < 20 {
      
                      prod := grid[i][j] * grid[i+1][j] * grid[i+2][j] * grid[i+3][j]
      
                      if prod > maxProd {
      
                          maxProd = prod
      
                      }
      
                  }
      
                  // diag down right
      
                  if i+3 < 20 && j+3 < 20 {
      
                      prod := grid[i][j] * grid[i+1][j+1] * grid[i+2][j+2] * grid[i+3][j+3]
      
                      if prod > maxProd {
      
                          maxProd = prod
      
                      }
      
                  }
      
                  // diag down left
      
                  if i+3 < 20 && j-3 >= 0 {
      
                      prod := grid[i][j] * grid[i+1][j-1] * grid[i+2][j-2] * grid[i+3][j-3]
      
                      if prod > maxProd {
      
                          maxProd = prod
      
                      }
      
                  }
      
              }
      
          }
      
          fmt.Println(maxProd)
      
      }
    githubLink: "https://github.com/tvarley/euler/blob/master/go/euler011.go"
  - language: "rust"
    code: |
      // https://projecteuler.net/problem=11
      //
      // In the 20×20 grid below, four numbers along a diagonal line have been marked in red.
      //
      // The product of these numbers is 26 × 63 × 78 × 14 = 1788696.
      //
      // What is the greatest product of four adjacent numbers in the same direction (up, down, left, right, or diagonally) in the 20×20 grid?
      //
      // Answer: 70600674
      
      const GRID_STR: &str = "08 02 22 97 38 15 00 40 00 75 04 05 07 78 52 12 50 77 91 08
      49 49 99 40 17 81 18 57 60 87 17 40 98 43 69 48 04 56 62 00
      81 49 31 73 55 79 14 29 93 71 40 67 53 88 30 03 49 13 36 65
      52 70 95 23 04 60 11 42 69 24 68 56 01 32 56 71 37 02 36 91
      22 31 16 71 51 67 63 89 41 92 36 54 22 40 40 28 66 33 13 80
      24 47 32 60 99 03 45 02 44 75 33 53 78 36 84 20 35 17 12 50
      32 98 81 28 64 23 67 10 26 38 40 67 59 54 70 66 18 38 64 70
      67 26 20 68 02 62 12 20 95 63 94 39 63 08 40 91 66 49 94 21
      24 55 58 05 66 73 99 26 97 17 78 78 96 83 14 88 34 89 63 72
      21 36 23 09 75 00 76 44 20 45 35 14 00 61 33 97 34 31 33 95
      78 17 53 28 22 75 31 67 15 94 03 80 04 62 16 14 09 53 56 92
      16 39 05 42 96 35 31 47 55 58 88 24 00 17 54 24 36 29 85 57
      86 56 00 48 35 71 89 07 05 44 44 37 44 60 21 58 51 54 17 58
      19 80 81 68 05 94 47 69 28 73 92 13 86 52 17 77 04 89 55 40
      04 52 08 83 97 35 99 16 07 97 57 32 16 26 26 79 33 27 98 66
      88 36 68 87 57 62 20 72 03 46 33 67 46 55 12 32 63 93 53 69
      04 42 16 73 38 25 39 11 24 94 72 18 08 46 29 32 40 62 76 36
      20 69 36 41 72 30 23 88 34 62 99 69 82 67 59 85 74 04 36 16
      20 73 35 29 78 31 90 01 74 31 49 71 48 86 81 16 23 57 05 54
      01 70 54 71 83 51 54 69 16 92 33 48 61 43 52 01 89 19 67 48";
      
      pub fn largest_product_in_grid(adjacent: usize) -> u64 {
          let grid: Vec<Vec<u32>> = GRID_STR.lines()
              .map(|line| line.split_whitespace()
                   .map(|s| s.parse().unwrap())
                   .collect())
              .collect();
          let rows = grid.len();
          let cols = grid[0].len();
          let mut max_product = 0u64;
      
          // Horizontal
          for i in 0..rows {
              for j in 0..=(cols - adjacent) {
                  let product = (0..adjacent).map(|k| grid[i][j + k] as u64).product();
                  if product > max_product {
                      max_product = product;
                  }
              }
          }
      
          // Vertical
          for i in 0..=(rows - adjacent) {
              for j in 0..cols {
                  let product = (0..adjacent).map(|k| grid[i + k][j] as u64).product();
                  if product > max_product {
                      max_product = product;
                  }
              }
          }
      
          // Diagonal \
          for i in 0..=(rows - adjacent) {
              for j in 0..=(cols - adjacent) {
                  let product = (0..adjacent).map(|k| grid[i + k][j + k] as u64).product();
                  if product > max_product {
                      max_product = product;
                  }
              }
          }
      
          // Diagonal /
          for i in 0..=(rows - adjacent) {
              for j in (adjacent-1)..cols {
                  let product = (0..adjacent).map(|k| grid[i + k][j - k] as u64).product();
                  if product > max_product {
                      max_product = product;
                  }
              }
          }
      
          max_product
      }
      
      #[cfg(test)]
      mod tests {
          use super::*;
      
          #[test]
          fn euler_011() {
              assert_eq!(largest_product_in_grid(4), 70_600_674);
          }
      }
    githubLink: "https://github.com/tvarley/euler/blob/master/rust/src/euler011.rs"
tags: ["euler"]
featured: false
showcase: true
---

## Additional Notes

This is Project Euler problem 11: Largest Product in a Grid.

In the 20×20 grid below, four numbers along a diagonal line have been marked in red. (The grid is given in the problem.) The product of these numbers is 26 × 63 × 78 × 14 = 1788696. What is the greatest product of four adjacent numbers in the same direction (up, down, left, right, or diagonally) in the 20×20 grid? Answer: 70600674
