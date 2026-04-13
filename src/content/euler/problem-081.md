---
problemNumber: 81
title: "Path Sum: Two Ways"
description: |
  In the 5 by 5 matrix below, the minimal path sum from the top left to the bottom right, by only moving to the right and down, is indicated in bold red and is equal to 2427.

  $$ \begin{pmatrix} \color{red}{131} & 673 & 234 & 103 & 18\\\\ \color{red}{201} & \color{red}{96} & \color{red}{342} & 965 & 150\\\\ 630 & 803 & \color{red}{746} & \color{red}{422} & 111\\\\ 537 & 699 & 497 & \color{red}{121} & 956\\\\ 805 & 732 & 524 & \color{red}{37} & \color{red}{331} \end{pmatrix} $$

  Find the minimal path sum from the top left to the bottom right by only moving right and down in matrix.txt (right click and 'Save Link/Target As...), a 31K text file containing an 80 by 80 matrix.
difficulty: "medium"
date: "2026-04-12"
technologies: ["dynamic programming", "grid", "file I/O"]
implementations:
  - language: "cpp"
    code: |
      #include <iostream>
      #include <vector>
      #include <fstream>
      #include <sstream>
      #include <algorithm>

      int path_sum_two_ways() {
          std::ifstream file("matrix.txt");
          std::vector<std::vector<int>> matrix(80, std::vector<int>(80));
          std::string line;
          int row = 0;
          while (std::getline(file, line) && row < 80) {
              std::stringstream ss(line);
              std::string token;
              int col = 0;
              while (std::getline(ss, token, ',') && col < 80) {
                  matrix[row][col] = std::stoi(token);
                  ++col;
              }
              ++row;
          }
          std::vector<std::vector<int>> dp = matrix;
          for (int j = 1; j < 80; ++j) {
              dp[0][j] += dp[0][j - 1];
          }
          for (int i = 1; i < 80; ++i) {
              dp[i][0] += dp[i - 1][0];
              for (int j = 1; j < 80; ++j) {
                  dp[i][j] += std::min(dp[i - 1][j], dp[i][j - 1]);
              }
          }
          return dp[79][79];
      }
    githubLink: "https://github.com/tvarley/euler/blob/master/cpp/src/euler081.cpp"
    performance: "~1ms"
  - language: "go"
    code: |
      package main

      import (
          "bufio"
          "fmt"
          "os"
          "strconv"
          "strings"
      )

      func pathSumTwoWays() int {
          file, err := os.Open("matrix.txt")
          if err != nil {
              return -1
          }
          defer file.Close()
          scanner := bufio.NewScanner(file)
          matrix := make([][]int, 80)
          for i := range matrix {
              matrix[i] = make([]int, 80)
          }
          row := 0
          for scanner.Scan() && row < 80 {
              line := scanner.Text()
              tokens := strings.Split(line, ",")
              for col, token := range tokens {
                  if col >= 80 { break }
                  matrix[row][col], _ = strconv.Atoi(token)
              }
              row++
          }
          dp := make([][]int, 80)
          for i := range dp {
              dp[i] = make([]int, 80)
              copy(dp[i], matrix[i])
          }
          for j := 1; j < 80; j++ {
              dp[0][j] += dp[0][j-1]
          }
          for i := 1; i < 80; i++ {
              dp[i][0] += dp[i-1][0]
              for j := 1; j < 80; j++ {
                  dp[i][j] += min(dp[i-1][j], dp[i][j-1])
              }
          }
          return dp[79][79]
      }

      func min(a, b int) int {
          if a < b { return a }
          return b
      }

      func main() {
          fmt.Println("Answer:", pathSumTwoWays())
      }
    githubLink: "https://github.com/tvarley/euler/blob/master/go/src/euler081.go"
    performance: "~1ms"
  - language: "java"
    code: |
      import java.io.*;
      import java.util.*;

      public class Euler081 {
          public static int pathSumTwoWays() {
              try {
                  BufferedReader br = new BufferedReader(new FileReader("matrix.txt"));
                  int[][] matrix = new int[80][80];
                  String line;
                  int row = 0;
                  while ((line = br.readLine()) != null && row < 80) {
                      String[] tokens = line.split(",");
                      for (int col = 0; col < 80; col++) {
                          matrix[row][col] = Integer.parseInt(tokens[col]);
                      }
                      row++;
                  }
                  br.close();
                  int[][] dp = new int[80][80];
                  for (int i = 0; i < 80; i++) {
                      System.arraycopy(matrix[i], 0, dp[i], 0, 80);
                  }
                  for (int j = 1; j < 80; j++) {
                      dp[0][j] += dp[0][j - 1];
                  }
                  for (int i = 1; i < 80; i++) {
                      dp[i][0] += dp[i - 1][0];
                      for (int j = 1; j < 80; j++) {
                          dp[i][j] += Math.min(dp[i - 1][j], dp[i][j - 1]);
                      }
                  }
                  return dp[79][79];
              } catch (Exception e) {
                  return -1;
              }
          }

          public static void main(String[] args) {
              System.out.println("Answer: " + pathSumTwoWays());
          }
      }
    githubLink: "https://github.com/tvarley/euler/blob/master/java/src/Euler081.java"
    performance: "~1ms"
  - language: "javascript"
    code: |
      const fs = require('fs');

      function path_sum_two_ways() {
        const data = fs.readFileSync('src/euler/matrix.txt', 'utf8');
        const lines = data.trim().split('\n');
        const N = 80;
        const matrix = [];
        for (let i = 0; i < N; i++) {
          const row = lines[i].split(',').map(Number);
          matrix.push(row);
        }
        const dp = matrix.map(row => row.slice()); // copy
        for (let j = 1; j < N; j++) {
          dp[0][j] += dp[0][j - 1];
        }
        for (let i = 1; i < N; i++) {
          dp[i][0] += dp[i - 1][0];
          for (let j = 1; j < N; j++) {
            dp[i][j] += Math.min(dp[i - 1][j], dp[i][j - 1]);
          }
        }
        return dp[N - 1][N - 1];
      }

      module.exports = {
        answer: () => path_sum_two_ways()
      };
    githubLink: "https://github.com/tvarley/euler/blob/master/javascript/src/euler/solution081.js"
    performance: "~10ms"
  - language: "python"
    code: |
      def solve():
          with open('../cpp/src/p081_matrix.txt') as f:
              matrix = [list(map(int, line.split(','))) for line in f]
          n = len(matrix)
          dp = [[0] * n for _ in range(n)]
          dp[0][0] = matrix[0][0]
          for i in range(1, n):
              dp[i][0] = dp[i-1][0] + matrix[i][0]
              dp[0][i] = dp[0][i-1] + matrix[0][i]
          for i in range(1, n):
              for j in range(1, n):
                  dp[i][j] = min(dp[i-1][j], dp[i][j-1]) + matrix[i][j]
          return dp[n-1][n-1]
    githubLink: "https://github.com/tvarley/euler/blob/master/python/src/euler081.py"
    performance: "~10ms"
  - language: "rust"
    code: |
      pub fn path_sum_two_ways() -> u64 {
          let content = std::fs::read_to_string("../cpp/src/p081_matrix.txt").unwrap();
          let matrix: Vec<Vec<u64>> = content.lines().map(|line| {
              line.split(',').map(|s| s.trim().parse().unwrap()).collect()
          }).collect();
          let rows = matrix.len();
          let cols = matrix[0].len();
          let mut dp = matrix.clone();
          for i in 0..rows {
              for j in 0..cols {
                  if i == 0 && j == 0 {
                      continue;
                  }
                  let mut min = u64::MAX;
                  if i > 0 {
                      min = min.min(dp[i-1][j]);
                  }
                  if j > 0 {
                      min = min.min(dp[i][j-1]);
                  }
                  dp[i][j] += min;
              }
          }
          dp[rows-1][cols-1]
      }
    githubLink: "https://github.com/tvarley/euler/blob/master/rust/src/euler081.rs"
    performance: "~1ms"
tags: ["dynamic programming", "pathfinding", "grid"]
featured: false
showcase: false
---

## Solution Notes

### Mathematical Background
This problem involves finding the minimal path sum in an 80x80 grid, where movement is restricted to right and down directions. It's a classic application of dynamic programming for grid-based path minimization.

### Algorithm Analysis
The solution uses dynamic programming with a 2D DP table. We initialize the DP table with the matrix values, then compute the minimum path sum for each cell by taking the minimum of the cell above and the cell to the left, adding the current cell's value. This ensures each subpath to any cell is optimal.

Time complexity: O(N²) where N=80, as we iterate through all cells once.
Space complexity: O(N²) for the DP table, though in-place modification could reduce this.

### Performance
The algorithm executes very quickly, typically under 1-10ms depending on the implementation language and file I/O overhead. The DP approach is highly efficient for this problem size.

### Key Insights
- Dynamic programming allows us to break down the problem into smaller subproblems, solving each only once.
- In-place modification of the matrix can optimize memory usage.
- File I/O for reading the large matrix is the primary bottleneck in some implementations.

### Educational Value
This problem demonstrates the power of dynamic programming for optimization problems on grids. It teaches how to transform a path-finding problem into a systematic computation that guarantees optimality.