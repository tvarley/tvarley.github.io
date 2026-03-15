---
problemNumber: 18
title: "Maximum Path Sum I"
description: |
  By starting at the top of the triangle below and moving to adjacent numbers on the row below, the maximum total from top to bottom is 23.

  3
  7 4
  2 4 6
  8 5 9 3

  That is, 3 + 7 + 4 + 9 = 23.

  Find the maximum total from top to bottom of the triangle below:

  75
  95 64
  17 47 82
  18 35 87 10
  20 04 82 47 65
  19 01 23 75 03 34
  88 02 77 73 07 63 67
  99 65 04 28 06 16 70 92
  41 41 26 56 83 40 80 70 33
  41 48 72 33 47 32 37 16 94 29
  53 71 44 65 25 43 91 52 97 51 14
  70 11 33 28 77 73 17 78 39 68 17 57
  91 71 52 38 17 14 91 43 58 50 27 29 48
  63 66 04 68 89 53 67 30 73 16 69 87 40 31
  04 62 98 27 23 09 70 98 73 93 38 53 60 04 23

  NOTE: As there are only 16384 routes, it is possible to solve this by trying every route. However, Problem 67, is the same challenge with a triangle containing one-hundred rows; it cannot be solved by brute force, and requires a clever method! ;o)
difficulty: "medium"
date: 2026-03-10
technologies: ["cpp", "java", "javascript", "python", "ruby", "go", "rust"]
implementations:
  - language: "cpp"
    code: |
      // Answer: 1074
      
      #include <iostream>
      #include <fstream>
      #include <sstream>
      #include <vector>
      
      static const char* test_data_fname = "./src/euler_18_test_data.txt";
      static const char* data_fname = "./src/euler_18_data.txt";
      
      int maximum_path_sum_1(const char* fname)
      {
        std::ifstream fin(fname);
      
        if( !fin.is_open()){
          std::cerr << "Failed to open input file: " << fname << std::endl;
          return -1;
        }
      
        std::vector<std::vector<int> > lines;
      
        for( std::string line ; std::getline(fin,line);){
          std::stringstream ss(line);
          std::string number;
          std::vector<int> inner;
      
          while (std::getline(ss,number,',')) {
            inner.push_back(std::stoi(number));
          }
          lines.push_back(inner);
        }
      
        for( int i = lines.size()-1; i > 0 ; --i){
          for( int j = 0 ; j < i; j++){
            if( lines[i][j] > lines[i][j+1] ){
              lines[i-1][j] += lines[i][j];
            }else{
              lines[i-1][j] += lines[i][j+1];
            }
          }
        }
      
        return lines[0][0];
      }
      
      #if ! defined UNITTEST_MODE
      int main(int argc, char const *argv[])
      {
        std::cout << "Answer: " << maximum_path_sum_1(data_fname) << std::endl;
      }
      #endif // #if ! defined UNITTEST_MODE
    githubLink: "https://github.com/tvarley/euler/blob/master/cpp/src/euler018.cpp"
    performance: "O(n) time complexity"
  - language: "java"
    code: |
      package org.tvarley.euler.solutions;
      
      import org.tvarley.euler.Solution;
      
      public class Solution018 implements Solution {
        private static final int[][] TRIANGLE = {
          {75},
          {95, 64},
          {17, 47, 82},
          {18, 35, 87, 10},
          {20, 4, 82, 47, 65},
          {19, 1, 23, 75, 3, 34},
          {88, 2, 77, 73, 7, 63, 67},
          {99, 65, 4, 28, 6, 16, 70, 92},
          {41, 41, 26, 56, 83, 40, 80, 70, 33},
          {41, 48, 72, 33, 47, 32, 37, 16, 94, 29},
          {53, 71, 44, 65, 25, 43, 91, 52, 97, 51, 14},
          {70, 11, 33, 28, 77, 73, 17, 78, 39, 68, 17, 57},
          {91, 71, 52, 38, 17, 14, 91, 43, 58, 50, 27, 29, 48},
          {63, 66, 4, 68, 89, 53, 67, 30, 73, 16, 69, 87, 40, 31},
          {4, 62, 98, 27, 23, 9, 70, 98, 73, 93, 38, 53, 60, 4, 23}
        };
      
        public String solve() {
          // Dynamic programming: modify triangle in place
          for (int i = TRIANGLE.length - 2; i >= 0; i--) {
            for (int j = 0; j < TRIANGLE[i].length; j++) {
              TRIANGLE[i][j] += Math.max(TRIANGLE[i+1][j], TRIANGLE[i+1][j+1]);
            }
          }
          return Integer.toString(TRIANGLE[0][0]);
        }
      }
    githubLink: "https://github.com/tvarley/euler/blob/master/java/src/main/java/org/tvarley/euler/solutions/Solution018.java"
  - language: "javascript"
    code: |
      const triangle = [
        [75],
        [95, 64],
        [17, 47, 82],
        [18, 35, 87, 10],
        [20, 04, 82, 47, 65],
        [19, 01, 23, 75, 03, 34],
        [88, 02, 77, 73, 07, 63, 67],
        [99, 65, 04, 28, 06, 16, 70, 92],
        [41, 41, 26, 56, 83, 40, 80, 70, 33],
        [41, 48, 72, 33, 47, 32, 37, 16, 94, 29],
        [53, 71, 44, 65, 25, 43, 91, 52, 97, 51, 14],
        [70, 11, 33, 28, 77, 73, 17, 78, 39, 68, 17, 57],
        [91, 71, 52, 38, 17, 14, 91, 43, 58, 50, 27, 29, 48],
        [63, 66, 04, 68, 89, 53, 67, 30, 73, 16, 69, 87, 40, 31],
        [04, 62, 98, 27, 23, 09, 70, 98, 73, 93, 38, 53, 60, 04, 23]
      ];
      
      module.exports = {
        answer: () => {
          // Start from the bottom row and work upwards
          let dp = [...triangle[triangle.length - 1]];
      
          for (let i = triangle.length - 2; i >= 0; i--) {
            const newDp = [];
            for (let j = 0; j < triangle[i].length; j++) {
              newDp[j] = triangle[i][j] + Math.max(dp[j], dp[j + 1]);
            }
            dp = newDp;
          }
      
          return dp[0];
        }
      };
    githubLink: "https://github.com/tvarley/euler/blob/master/javascript/src/euler/solution018.js"
  - language: "python"
    code: |
      def solve():
          """
          Maximum path sum I
          By starting at the top of the triangle below and moving to adjacent numbers on the row below,
          the maximum total from top to bottom is 23.
          [small triangle]
          Find the maximum total from top to bottom of the triangle below:
          [large triangle]
          """
          triangle = [
              [75],
              [95, 64],
              [17, 47, 82],
              [18, 35, 87, 10],
              [20, 4, 82, 47, 65],
              [19, 1, 23, 75, 3, 34],
              [88, 2, 77, 73, 7, 63, 67],
              [99, 65, 4, 28, 6, 16, 70, 92],
              [41, 41, 26, 56, 83, 40, 80, 70, 33],
              [41, 48, 72, 33, 47, 32, 37, 16, 94, 29],
              [53, 71, 44, 65, 25, 43, 91, 52, 97, 51, 14],
              [70, 11, 33, 28, 77, 73, 17, 78, 39, 68, 17, 57],
              [91, 71, 52, 38, 17, 14, 91, 43, 58, 50, 27, 29, 48],
              [63, 66, 4, 68, 89, 53, 67, 30, 73, 16, 69, 87, 40, 31],
              [4, 62, 98, 27, 23, 9, 70, 98, 73, 93, 38, 53, 60, 4, 23]
          ]
          # DP bottom up
          for i in range(len(triangle) - 2, -1, -1):
              for j in range(len(triangle[i])):
                  triangle[i][j] += max(triangle[i+1][j], triangle[i+1][j+1])
          return triangle[0][0]
    githubLink: "https://github.com/tvarley/euler/blob/master/python/src/euler018.py"
  - language: "ruby"
    code: |
      def maximum_path_sum_one(filename)
        rows = File.open(filename).map do |line|
          line.strip.split(',').map(&:to_i)
        end.reverse
        rows.each_with_index do |row, row_index|
          row.each_with_index do |val, val_index|
            next if val_index >= row.size - 1
      
            rows[row_index + 1][val_index] += [val, row[val_index + 1] || -1].max
          end
        end
        rows.last.first
      rescue StandardError => e
        puts "***ERROR***: #{e}"
      end
      
      puts maximum_path_sum_one('./lib/euler_18_data.txt') if __FILE__ == $PROGRAM_NAME
    githubLink: "https://github.com/tvarley/euler/blob/master/ruby/lib/euler018.rb"
  - language: "go"
    code: |
      import (
      
          "fmt"
      
          "strings"
      
      )
      
      func main() {
      
          triangleStr := `75
      
      95 64
      
      17 47 82
      
      18 35 87 10
      
      20 04 82 47 65
      
      19 01 23 75 03 34
      
      88 02 77 73 07 63 67
      
      99 65 04 28 06 16 70 92
      
      41 41 26 56 83 40 80 70 33
      
      41 48 72 33 47 32 37 16 94 29
      
      53 71 44 65 25 43 91 52 97 51 14
      
      70 11 33 28 77 73 17 78 39 68 17 57
      
      91 71 52 38 17 14 91 43 58 50 27 29 48
      
      63 66 04 68 89 53 67 30 73 16 69 87 40 31
      
      04 62 98 27 23 09 70 98 73 93 38 53 60 04 23`
      
          lines := strings.Split(triangleStr, "\n")
      
          var triangle [][]int
      
          for _, line := range lines {
      
              parts := strings.Fields(line)
      
              if len(parts) == 0 {
      
                  continue
      
              }
      
              row := make([]int, len(parts))
      
              for j, p := range parts {
      
                  fmt.Sscanf(p, "%d", &row[j])
      
              }
      
              triangle = append(triangle, row)
      
          }
      
          for i := len(triangle) - 2; i >= 0; i-- {
      
              for j := 0; j < len(triangle[i]); j++ {
      
                  triangle[i][j] += max(triangle[i+1][j], triangle[i+1][j+1])
      
              }
      
          }
      
          fmt.Println(triangle[0][0])
      
      }
      
      func max(a, b int) int {
      
          if a > b {
      
              return a
      
          }
      
          return b
      
      }
    githubLink: "https://github.com/tvarley/euler/blob/master/go/euler018.go"
  - language: "rust"
    code: |
      // Answer: 1074
      
      const TRIANGLE_STR: &str = "75
      95 64
      17 47 82
      18 35 87 10
      20 04 82 47 65
      19 01 23 75 03 34
      88 02 77 73 07 63 67
      99 65 04 28 06 16 70 92
      41 41 26 56 83 40 80 70 33
      41 48 72 33 47 32 37 16 94 29
      53 71 44 65 25 43 91 52 97 51 14
      70 11 33 28 77 73 17 78 39 68 17 57
      91 71 52 38 17 14 91 43 58 50 27 29 48
      63 66 04 68 89 53 67 30 73 16 69 87 40 31
      04 62 98 27 23 09 70 98 73 93 38 53 60 04 23";
      
      pub fn maximum_path_sum() -> u32 {
          let triangle: Vec<Vec<u32>> = TRIANGLE_STR.lines()
              .map(|line| line.split_whitespace()
                   .map(|s| s.parse().unwrap())
                   .collect())
              .collect();
          let mut dp = triangle.clone();
          for row in (0..dp.len()-1).rev() {
              for col in 0..dp[row].len() {
                  dp[row][col] += dp[row+1][col].max(dp[row+1][col+1]);
              }
          }
          dp[0][0]
      }
      
      #[cfg(test)]
      mod tests {
          use super::*;
      
          #[test]
          fn euler_018() {
              assert_eq!(maximum_path_sum(), 1074);
          }
      }
    githubLink: "https://github.com/tvarley/euler/blob/master/rust/src/euler018.rs"
tags: ["euler"]
featured: false
showcase: true
---

## Solution Notes

### Mathematical Background

This is a classic [dynamic programming](https://grokipedia.com/page/Dynamic_programming) problem on a triangular grid. Each number can only move to one of two adjacent numbers in the row below. The goal is to find the path from top to bottom that maximizes the sum.

The triangle has 15 rows, with the bottom row having 15 elements. The total number of possible paths is $2^{14} = 16384$, which explains why brute force is feasible for this size.

### Algorithm Analysis

All implementations use dynamic programming with O(n²) time complexity, where n is the number of rows. The algorithm starts from the bottom row and works upwards, replacing each number with the maximum sum achievable from that position.

Key steps:
1. Start from the second-to-last row
2. For each position, add the maximum of the two possible paths below
3. Work upwards until reaching the top

This approach transforms the triangle in-place, using each row to store the maximum path sum to that point.

### Key Insights

- Dynamic programming eliminates the need to explore all paths
- Working from bottom to top avoids recomputation
- The optimal substructure property allows us to solve smaller subproblems first
- This same approach scales to Problem 67's much larger triangle
- Memory usage remains O(n²) for the triangle storage

### Educational Value

This problem introduces:
- Dynamic programming concepts and optimal substructure
- The difference between brute force and optimized algorithms
- How exponential complexity can be reduced to polynomial
- Tree/graph traversal techniques
- The importance of choosing the right algorithmic approach based on problem size
