---
problemNumber: 83
title: "Path Sum: Four Ways"
description: |
  NOTE: This problem is a significantly more challenging version of Problem 81.

  In the 5 by 5 matrix below, the minimal path sum from the top left to the bottom right, by moving left, right, up, and down, is indicated in bold red and is equal to 2297.

  $$ \begin{pmatrix} \color{red}{131} & 673 & \color{red}{234} & \color{red}{103} & \color{red}{18}\\\\ \color{red}{201} & \color{red}{96} & \color{red}{342} & 965 & \color{red}{150}\\\\ 630 & 803 & 746 & \color{red}{422} & \color{red}{111}\\\\ 537 & 699 & 497 & \color{red}{121} & 956\\\\ 805 & 732 & 524 & \color{red}{37} & \color{red}{331} \end{pmatrix} $$

  Find the minimal path sum from the top left to the bottom right by moving left, right, up, and down in matrix.txt (right click and "Save Link/Target As..."), a 31K text file containing an 80 by 80 matrix.
difficulty: "hard"
date: "2026-04-12"
technologies: ["shortest path", "Dijkstra", "priority queue", "grid"]
implementations:
  - language: "cpp"
    code: |
      #include <iostream>
      #include <vector>
      #include <fstream>
      #include <sstream>
      #include <queue>
      #include <algorithm>
      #include <climits>

      int path_sum_four_ways() {
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
          std::vector<std::vector<int>> dist(80, std::vector<int>(80, INT_MAX));
          dist[0][0] = matrix[0][0];
          std::priority_queue<std::tuple<int, int, int>, std::vector<std::tuple<int, int, int>>, std::greater<>> pq;
          pq.push({matrix[0][0], 0, 0});
          int di[4] = {-1, 0, 1, 0};
          int dj[4] = {0, 1, 0, -1};
          while (!pq.empty()) {
              auto [cost, i, j] = pq.top(); pq.pop();
              if (cost > dist[i][j]) continue;
              for (int d = 0; d < 4; ++d) {
                  int ni = i + di[d], nj = j + dj[d];
                  if (ni >= 0 && ni < 80 && nj >= 0 && nj < 80) {
                      int ncost = cost + matrix[ni][nj];
                      if (ncost < dist[ni][nj]) {
                          dist[ni][nj] = ncost;
                          pq.push({ncost, ni, nj});
                      }
                  }
              }
          }
          return dist[79][79];
      }
    githubLink: "https://github.com/tvarley/euler/blob/master/cpp/src/euler083.cpp"
    performance: "~50ms"
  - language: "go"
    code: |
      package main

      import (
          "bufio"
          "container/heap"
          "fmt"
          "os"
          "strconv"
          "strings"
      )

      type Item struct {
          cost, x, y int
      }

      type PriorityQueue []*Item

      func (pq PriorityQueue) Len() int { return len(pq) }

      func (pq PriorityQueue) Less(i, j int) bool { return pq[i].cost < pq[j].cost }

      func (pq PriorityQueue) Swap(i, j int) { pq[i], pq[j] = pq[j], pq[i] }

      func (pq *PriorityQueue) Push(x interface{}) { *pq = append(*pq, x.(*Item)) }

      func (pq *PriorityQueue) Pop() interface{} {
          old := *pq
          n := len(old)
          item := old[n-1]
          *pq = old[0 : n-1]
          return item
      }

      func pathSumFourWays() int {
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
          dist := make([][]int, 80)
          for i := range dist {
              dist[i] = make([]int, 80)
              for j := range dist[i] {
                  dist[i][j] = 1<<31 - 1
              }
          }
          dist[0][0] = matrix[0][0]
          pq := &PriorityQueue{}
          heap.Init(pq)
          heap.Push(pq, &Item{matrix[0][0], 0, 0})
          di := []int{-1, 0, 1, 0}
          dj := []int{0, 1, 0, -1}
          for pq.Len() > 0 {
              item := heap.Pop(pq).(*Item)
              cost, i, j := item.cost, item.x, item.y
              if cost > dist[i][j] { continue }
              for d := 0; d < 4; d++ {
                  ni, nj := i + di[d], j + dj[d]
                  if ni >= 0 && ni < 80 && nj >= 0 && nj < 80 {
                      ncost := cost + matrix[ni][nj]
                      if ncost < dist[ni][nj] {
                          dist[ni][nj] = ncost
                          heap.Push(pq, &Item{ncost, ni, nj})
                      }
                  }
              }
          }
          return dist[79][79]
      }

      func main() {
          fmt.Println("Answer:", pathSumFourWays())
      }
    githubLink: "https://github.com/tvarley/euler/blob/master/go/src/euler083.go"
    performance: "~100ms"
  - language: "java"
    code: |
      import java.io.*;
      import java.util.*;

      public class Euler083 {
          public static int pathSumFourWays() {
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
                  int[][] dist = new int[80][80];
                  for (int i = 0; i < 80; i++) {
                      Arrays.fill(dist[i], Integer.MAX_VALUE);
                  }
                  dist[0][0] = matrix[0][0];
                  PriorityQueue<int[]> pq = new PriorityQueue<>((a, b) -> Integer.compare(a[0], b[0]));
                  pq.add(new int[]{matrix[0][0], 0, 0});
                  int[] di = {-1, 0, 1, 0};
                  int[] dj = {0, 1, 0, -1};
                  while (!pq.isEmpty()) {
                      int[] curr = pq.poll();
                      int cost = curr[0], i = curr[1], j = curr[2];
                      if (cost > dist[i][j]) continue;
                      for (int d = 0; d < 4; d++) {
                          int ni = i + di[d], nj = j + dj[d];
                          if (ni >= 0 && ni < 80 && nj >= 0 && nj < 80) {
                              int ncost = cost + matrix[ni][nj];
                              if (ncost < dist[ni][nj]) {
                                  dist[ni][nj] = ncost;
                                  pq.add(new int[]{ncost, ni, nj});
                              }
                          }
                      }
                  }
                  return dist[79][79];
              } catch (Exception e) {
                  return -1;
              }
          }

          public static void main(String[] args) {
              System.out.println("Answer: " + pathSumFourWays());
          }
      }
    githubLink: "https://github.com/tvarley/euler/blob/master/java/src/Euler083.java"
    performance: "~100ms"
  - language: "javascript"
    code: |
      const fs = require('fs');

      class MinHeap {
        constructor() {
          this.heap = [];
        }
        push(item) {
          this.heap.push(item);
          this.bubbleUp(this.heap.length - 1);
        }
        pop() {
          if (this.heap.length === 1) return this.heap.pop();
          const root = this.heap[0];
          this.heap[0] = this.heap.pop();
          this.sinkDown(0);
          return root;
        }
        size() {
          return this.heap.length;
        }
        bubbleUp(index) {
          while (index > 0) {
            const parentIndex = Math.floor((index - 1) / 2);
            if (this.heap[index][0] < this.heap[parentIndex][0]) {
              [this.heap[index], this.heap[parentIndex]] = [this.heap[parentIndex], this.heap[index]];
              index = parentIndex;
            } else {
              break;
            }
          }
        }
        sinkDown(index) {
          const length = this.heap.length;
          while (true) {
            let left = 2 * index + 1;
            let right = 2 * index + 2;
            let smallest = index;
            if (left < length && this.heap[left][0] < this.heap[smallest][0]) smallest = left;
            if (right < length && this.heap[right][0] < this.heap[smallest][0]) smallest = right;
            if (smallest !== index) {
              [this.heap[index], this.heap[smallest]] = [this.heap[smallest], this.heap[index]];
              index = smallest;
            } else {
              break;
            }
          }
        }
      }

      function path_sum_four_ways() {
        const data = fs.readFileSync('src/euler/matrix.txt', 'utf8');
        const lines = data.trim().split('\n');
        const N = 80;
        const matrix = [];
        for (let i = 0; i < N; i++) {
          const row = lines[i].split(',').map(Number);
          matrix.push(row);
        }
        const dist = Array.from({length: N}, () => Array(N).fill(Number.MAX_SAFE_INTEGER));
        dist[0][0] = matrix[0][0];
        const pq = new MinHeap();
        pq.push([matrix[0][0], 0, 0]);
        const di = [-1, 0, 1, 0];
        const dj = [0, 1, 0, -1];
        while (pq.size() > 0) {
          const [cost, i, j] = pq.pop();
          if (cost > dist[i][j]) continue;
          for (let d = 0; d < 4; d++) {
            const ni = i + di[d], nj = j + dj[d];
            if (ni >= 0 && ni < N && nj >= 0 && nj < N) {
              const ncost = cost + matrix[ni][nj];
              if (ncost < dist[ni][nj]) {
                dist[ni][nj] = ncost;
                pq.push([ncost, ni, nj]);
              }
            }
          }
        }
        return dist[N - 1][N - 1];
      }

      module.exports = {
        answer: () => path_sum_four_ways()
      };
    githubLink: "https://github.com/tvarley/euler/blob/master/javascript/src/euler/solution083.js"
    performance: "~100ms"
  - language: "python"
    code: |
      import heapq

      def solve():
          with open('../cpp/src/p081_matrix.txt') as f:
              matrix = [list(map(int, line.split(','))) for line in f]
          n = len(matrix)
          dist = [[float('inf')] * n for _ in range(n)]
          dist[0][0] = matrix[0][0]
          pq = [(matrix[0][0], 0, 0)]
          while pq:
              cost, i, j = heapq.heappop(pq)
              if cost > dist[i][j]:
                  continue
              for di, dj in [(-1, 0), (1, 0), (0, -1), (0, 1)]:
                  ni, nj = i + di, j + dj
                  if 0 <= ni < n and 0 <= nj < n:
                      new_cost = cost + matrix[ni][nj]
                      if new_cost < dist[ni][nj]:
                          dist[ni][nj] = new_cost
                          heapq.heappush(pq, (new_cost, ni, nj))
          return dist[n-1][n-1]
    githubLink: "https://github.com/tvarley/euler/blob/master/python/src/euler083.py"
    performance: "~200ms"
  - language: "rust"
    code: |
      pub fn path_sum_four_ways() -> u64 {
          let content = std::fs::read_to_string("../cpp/src/p081_matrix.txt").unwrap();
          let mut matrix: Vec<Vec<u64>> = vec![];
          for line in content.lines() {
              let row: Vec<u64> = line.split(',').map(|s| s.trim().parse().unwrap()).collect();
              matrix.push(row);
          }
          let rows = matrix.len();
          let cols = matrix[0].len();
          let mut dist = vec![vec![u64::MAX; cols]; rows];
          let mut pq = std::collections::BinaryHeap::new();
          use std::cmp::Reverse;
          dist[0][0] = matrix[0][0];
          pq.push(Reverse((dist[0][0], 0, 0)));
          let dirs = [(-1, 0), (1, 0), (0, -1), (0, 1)];
          while let Some(Reverse((cost, x, y))) = pq.pop() {
              if cost > dist[x][y] {
                  continue;
              }
              for &(dx, dy) in &dirs {
                  let nx = x as i32 + dx;
                  let ny = y as i32 + dy;
                  if nx >= 0 && nx < rows as i32 && ny >= 0 && ny < cols as i32 {
                      let nx = nx as usize;
                      let ny = ny as usize;
                      let nc = cost + matrix[nx][ny];
                      if nc < dist[nx][ny] {
                          dist[nx][ny] = nc;
                          pq.push(Reverse((nc, nx, ny)));
                      }
                  }
              }
          }
          dist[rows - 1][cols - 1]
      }
    githubLink: "https://github.com/tvarley/euler/blob/master/rust/src/euler083.rs"
    performance: "~50ms"
tags: ["dijkstra", "shortest path", "priority queue", "grid"]
featured: false
showcase: false
---

## Solution Notes

### Mathematical Background
This problem extends Problem 81 and 82 by allowing movement in all four directions (up, down, left, right), making it impossible to solve with simple dynamic programming. Instead, it requires finding the shortest path in a graph where each cell is a node with edges to its four neighbors, weighted by the cell values.

### Algorithm Analysis
All implementations use Dijkstra's algorithm with a priority queue (min-heap) to find the minimum path sum. The algorithm maintains a distance matrix and explores cells in order of increasing cost, updating neighbor distances when a shorter path is found.

Time complexity: O((N²) log(N²)) where N=80, due to priority queue operations.
Space complexity: O(N²) for the distance matrix and priority queue.

### Performance
Dijkstra's algorithm is efficient for this problem size: fastest in Rust (~50ms), moderate in C++/Go/Java (~50-100ms), slower in JavaScript (~100ms) and Python (~200ms).

### Key Insights
- When movements are unrestricted, graph algorithms like Dijkstra replace DP approaches.
- Priority queues ensure we always process the most promising (lowest cost) cells first.
- The algorithm terminates when the bottom-right cell is dequeued with its final minimum cost.

### Educational Value
Introduces shortest path algorithms in grid-based problems, demonstrating when to choose Dijkstra over dynamic programming based on movement constraints.