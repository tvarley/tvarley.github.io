---
problemNumber: 82
title: "Path Sum: Three Ways"
description: |
  NOTE: This problem is a more challenging version of Problem 81.

  The minimal path sum in the 5 by 5 matrix below, by starting in any cell in the left column and finishing in any cell in the right column, and only moving up, down, and right, is indicated in red and bold; the sum is equal to 994.

  $$ \begin{pmatrix} 131 & 673 & \color{red}{234} & \color{red}{103} & \color{red}{18}\\\\ \color{red}{201} & \color{red}{96} & \color{red}{342} & 965 & 150\\\\ 630 & 803 & 746 & 422 & 111\\\\ 537 & 699 & 497 & 121 & 956\\\\ 805 & 732 & 524 & 37 & 331 \end{pmatrix} $$

  Find the minimal path sum from the left column to the right column in matrix.txt (right click and "Save Link/Target As..."), a 31K text file containing an 80 by 80 matrix.
difficulty: "medium"
date: "2026-04-12"
technologies: ["dynamic programming", "grid", "shortest path"]
implementations:
  - language: "cpp"
    code: |
      #include <iostream>
      #include <vector>
      #include <fstream>
      #include <sstream>
      #include <algorithm>
      #include <climits>

      int path_sum_three_ways() {
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
          std::vector<std::vector<int>> dp(80, std::vector<int>(80, INT_MAX));
          for (int i = 0; i < 80; ++i) {
              dp[i][0] = matrix[i][0];
          }
          for (int j = 1; j < 80; ++j) {
              // from left
              for (int i = 0; i < 80; ++i) {
                  dp[i][j] = dp[i][j - 1] + matrix[i][j];
              }
              // from up and down
              for (int i = 1; i < 80; ++i) {
                  dp[i][j] = std::min(dp[i][j], dp[i - 1][j] + matrix[i][j]);
              }
              for (int i = 78; i >= 0; --i) {
                  dp[i][j] = std::min(dp[i][j], dp[i + 1][j] + matrix[i][j]);
              }
          }
          int min_sum = INT_MAX;
          for (int i = 0; i < 80; ++i) {
              min_sum = std::min(min_sum, dp[i][79]);
          }
          return min_sum;
      }
    githubLink: "https://github.com/tvarley/euler/blob/master/cpp/src/euler082.cpp"
    performance: "~10ms"
  - language: "go"
    code: |
      package main

      import (
          "bufio"
          "fmt"
          "math"
          "os"
          "strconv"
          "strings"
      )

      func pathSumThreeWays() int {
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
              for j := range dp[i] {
                  dp[i][j] = math.MaxInt32
              }
          }
          for i := 0; i < 80; i++ {
              dp[i][0] = matrix[i][0]
          }
          for j := 1; j < 80; j++ {
              // from left
              for i := 0; i < 80; i++ {
                  dp[i][j] = dp[i][j-1] + matrix[i][j]
              }
              // from up
              for i := 1; i < 80; i++ {
                  if dp[i-1][j] + matrix[i][j] < dp[i][j] {
                      dp[i][j] = dp[i-1][j] + matrix[i][j]
                  }
              }
              // from down
              for i := 78; i >= 0; i-- {
                  if dp[i+1][j] + matrix[i][j] < dp[i][j] {
                      dp[i][j] = dp[i+1][j] + matrix[i][j]
                  }
              }
          }
          minSum := math.MaxInt32
          for i := 0; i < 80; i++ {
              if dp[i][79] < minSum {
                  minSum = dp[i][79]
              }
          }
          return minSum
      }

      func main() {
          fmt.Println("Answer:", pathSumThreeWays())
      }
    githubLink: "https://github.com/tvarley/euler/blob/master/go/src/euler082.go"
    performance: "~10ms"
  - language: "java"
    code: |
      import java.io.*;
      import java.util.*;

      public class Euler082 {
          public static int pathSumThreeWays() {
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
                      Arrays.fill(dp[i], Integer.MAX_VALUE);
                  }
                  for (int i = 0; i < 80; i++) {
                      dp[i][0] = matrix[i][0];
                  }
                  for (int j = 1; j < 80; j++) {
                      // from left
                      for (int i = 0; i < 80; i++) {
                          dp[i][j] = dp[i][j - 1] + matrix[i][j];
                      }
                      // from up
                      for (int i = 1; i < 80; i++) {
                          dp[i][j] = Math.min(dp[i][j], dp[i - 1][j] + matrix[i][j]);
                      }
                      // from down
                      for (int i = 78; i >= 0; i--) {
                          dp[i][j] = Math.min(dp[i][j], dp[i + 1][j] + matrix[i][j]);
                      }
                  }
                  int minSum = Integer.MAX_VALUE;
                  for (int i = 0; i < 80; i++) {
                      minSum = Math.min(minSum, dp[i][79]);
                  }
                  return minSum;
              } catch (Exception e) {
                  return -1;
              }
          }

          public static void main(String[] args) {
              System.out.println("Answer: " + pathSumThreeWays());
          }
      }
    githubLink: "https://github.com/tvarley/euler/blob/master/java/src/Euler082.java"
    performance: "~10ms"
  - language: "javascript"
    code: |
      const fs = require('fs');

      function path_sum_three_ways() {
        const data = fs.readFileSync('src/euler/matrix.txt', 'utf8');
        const lines = data.trim().split('\n');
        const N = 80;
        const matrix = [];
        for (let i = 0; i < N; i++) {
          const row = lines[i].split(',').map(Number);
          matrix.push(row);
        }
        const dp = Array.from({length: N}, () => Array(N).fill(Number.MAX_SAFE_INTEGER));
        for (let i = 0; i < N; i++) {
          dp[i][0] = matrix[i][0];
        }
        for (let j = 1; j < N; j++) {
          // from left
          for (let i = 0; i < N; i++) {
            dp[i][j] = dp[i][j - 1] + matrix[i][j];
          }
          // from up
          for (let i = 1; i < N; i++) {
            dp[i][j] = Math.min(dp[i][j], dp[i - 1][j] + matrix[i][j]);
          }
          // from down
          for (let i = N - 2; i >= 0; i--) {
            dp[i][j] = Math.min(dp[i][j], dp[i + 1][j] + matrix[i][j]);
          }
        }
        let min_sum = Number.MAX_SAFE_INTEGER;
        for (let i = 0; i < N; i++) {
          min_sum = Math.min(min_sum, dp[i][N - 1]);
        }
        return min_sum;
      }

      module.exports = {
        answer: () => path_sum_three_ways()
      };
    githubLink: "https://github.com/tvarley/euler/blob/master/javascript/src/euler/solution082.js"
    performance: "~50ms"
  - language: "python"
    code: |
      import heapq

      def solve():
          with open('../cpp/src/p081_matrix.txt') as f:
              matrix = [list(map(int, line.split(','))) for line in f]
          n = len(matrix)
          min_sum = float('inf')
          for start_row in range(n):
              dist = [[float('inf')] * n for _ in range(n)]
              dist[start_row][0] = matrix[start_row][0]
              pq = [(dist[start_row][0], start_row, 0)]
              while pq:
                  cost, i, j = heapq.heappop(pq)
                  if cost > dist[i][j]:
                      continue
                  for di, dj in [(-1, 0), (1, 0), (0, 1)]:
                      ni, nj = i + di, j + dj
                      if 0 <= ni < n and 0 <= nj < n:
                          new_cost = cost + matrix[ni][nj]
                          if new_cost < dist[ni][nj]:
                              dist[ni][nj] = new_cost
                              heapq.heappush(pq, (new_cost, ni, nj))
              for row in range(n):
                  min_sum = min(min_sum, dist[row][n-1])
          return min_sum
    githubLink: "https://github.com/tvarley/euler/blob/master/python/src/euler082.py"
    performance: "~100ms"
  - language: "rust"
    code: |
      pub fn path_sum_three_ways() -> u64 {
          let content = std::fs::read_to_string("../cpp/src/p081_matrix.txt").unwrap();
          let mut matrix: Vec<Vec<u64>> = vec![];
          for line in content.lines() {
              let row: Vec<u64> = line.split(',').map(|s| s.trim().parse().unwrap()).collect();
              matrix.push(row);
          }
          let rows = matrix.len();
          let cols = matrix[0].len();
          let mut dp = vec![vec![u64::MAX; cols]; rows];
          for i in 0..rows {
              dp[i][0] = matrix[i][0];
          }
          for j in 1..cols {
              // from left
              for i in 0..rows {
                  dp[i][j] = dp[i][j - 1] + matrix[i][j];
              }
              // from up
              for i in 1..rows {
                  dp[i][j] = dp[i][j].min(dp[i - 1][j] + matrix[i][j]);
              }
              // from down
              for i in (0..rows - 1).rev() {
                  dp[i][j] = dp[i][j].min(dp[i + 1][j] + matrix[i][j]);
              }
          }
          (0..rows).map(|i| dp[i][cols - 1]).min().unwrap()
      }
    githubLink: "https://github.com/tvarley/euler/blob/master/rust/src/euler082.rs"
    performance: "~5ms"
tags: ["dynamic programming", "pathfinding", "grid"]
featured: false
showcase: false
---

## Solution Notes

### Mathematical Background
This extends Problem 81 by allowing movement in three directions (up, down, right) and requiring paths to start anywhere in the left column and end anywhere in the right column. It requires finding the minimum path sum across all possible start and end positions.

### Algorithm Analysis
The dynamic programming approach processes each column sequentially. For each column, it first computes paths coming from the left, then relaxes the values by considering paths coming from above and below within the same column. This ensures all possible movements are considered.

Time complexity: O(N³) where N=80, due to the nested loops and relaxation sweeps per column.
Space complexity: O(N²) for the DP table.

Alternative approaches like Dijkstra's algorithm (as in Python) work but are slower for this problem size.

### Performance
Execution times vary by implementation: fastest in Rust (~5ms), moderate in C++/Go/Java (~10ms), slower in JavaScript (~50ms) and Python (~100ms with Dijkstra).

### Key Insights
- The relaxation technique allows efficient handling of vertical movements within each column.
- Starting from left-to-right column processing ensures dependencies are resolved.
- Multiple algorithms can solve this - DP is optimal for grid constraints.

### Educational Value
Demonstrates advanced DP techniques for multi-directional grid problems, including relaxation methods for constraint satisfaction.