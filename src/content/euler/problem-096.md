---
problemNumber: 96
title: Su Doku
description: Find the sum of the 3-digit numbers found in the top left corner of each solution grid.
difficulty: hard
date: 2024-04-12
technologies:
  - backtracking
  - constraint solving
implementations:
  - language: cpp
    code: |
      #include <iostream>
      #include <fstream>
      #include <vector>
      #include <string>

      bool is_valid(const std::vector<std::vector<int>>& grid, int row, int col, int num) {
          for (int i = 0; i < 9; ++i) {
              if (grid[row][i] == num || grid[i][col] == num) return false;
          }
          int box_row = (row / 3) * 3;
          int box_col = (col / 3) * 3;
          for (int i = 0; i < 3; ++i) {
              for (int j = 0; j < 3; ++j) {
                  if (grid[box_row + i][box_col + j] == num) return false;
              }
          }
          return true;
      }

      bool solve(std::vector<std::vector<int>>& grid) {
          for (int row = 0; row < 9; ++row) {
              for (int col = 0; col < 9; ++col) {
                  if (grid[row][col] == 0) {
                      for (int num = 1; num <= 9; ++num) {
                          if (is_valid(grid, row, col, num)) {
                              grid[row][col] = num;
                              if (solve(grid)) return true;
                              grid[row][col] = 0;
                          }
                      }
                      return false;
                  }
              }
          }
          return true;
      }

      long long su_doku() {
          std::ifstream file("src/p096_sudoku.txt");
          if (!file) return 0;
          long long sum = 0;
          std::string line;
          while (std::getline(file, line)) {
              if (line.substr(0, 4) == "Grid") continue;
              std::vector<std::vector<int>> grid(9, std::vector<int>(9));
              // Parse the first line we already read
              for (int j = 0; j < 9; ++j) {
                  grid[0][j] = line[j] - '0';
              }
              // Read remaining 8 lines
              for (int i = 1; i < 9; ++i) {
                  std::getline(file, line);
                  for (int j = 0; j < 9; ++j) {
                      grid[i][j] = line[j] - '0';
                  }
              }
              solve(grid);
              int num = grid[0][0] * 100 + grid[0][1] * 10 + grid[0][2];
              sum += num;
          }
          return sum;
      }
    githubLink: https://github.com/tvarley/euler/blob/master/cpp/src/euler096.cpp
    performance: ~200ms
  - language: go
    code: |
      package main

      import (
          "bufio"
          "os"
          "strconv"
      )

      func isValid(grid [][]int, row, col, num int) bool {
          for i := 0; i < 9; i++ {
              if grid[row][i] == num || grid[i][col] == num {
                  return false
              }
          }
          boxRow := (row / 3) * 3
          boxCol := (col / 3) * 3
          for i := 0; i < 3; i++ {
              for j := 0; j < 3; j++ {
                  if grid[boxRow+i][boxCol+j] == num {
                      return false
                  }
              }
          }
          return true
      }

      func solve(grid [][]int) bool {
          for row := 0; row < 9; row++ {
              for col := 0; col < 9; col++ {
                  if grid[row][col] == 0 {
                      for num := 1; num <= 9; num++ {
                          if isValid(grid, row, col, num) {
                              grid[row][col] = num
                              if solve(grid) {
                                  return true
                              }
                              grid[row][col] = 0
                          }
                      }
                      return false
                  }
              }
          }
          return true
      }

      func suDoku() int {
          file, err := os.Open("src/p096_sudoku.txt")
          if err != nil {
              return 0
          }
          defer file.Close()
          scanner := bufio.NewScanner(file)
          sum := 0
          for scanner.Scan() {
              line := scanner.Text()
              if len(line) >= 4 && line[:4] == "Grid" {
                  continue
              }
              grid := make([][]int, 9)
              for i := range grid {
                  grid[i] = make([]int, 9)
              }
              for j := 0; j < 9; j++ {
                  grid[0][j], _ = strconv.Atoi(string(line[j]))
              }
              for i := 1; i < 9; i++ {
                  scanner.Scan()
                  line = scanner.Text()
                  for j := 0; j < 9; j++ {
                      grid[i][j], _ = strconv.Atoi(string(line[j]))
                  }
              }
              solve(grid)
              num := grid[0][0]*100 + grid[0][1]*10 + grid[0][2]
              sum += num
          }
          return sum
      }
    githubLink: https://github.com/tvarley/euler/blob/master/go/src/euler096.go
    performance: ~200ms
  - language: java
    code: |
      import java.io.*;
      import java.util.*;

      public class Euler096 {
          static boolean isValid(int[][] grid, int row, int col, int num) {
              for (int i = 0; i < 9; i++) {
                  if (grid[row][i] == num || grid[i][col] == num) return false;
              }
              int boxRow = (row / 3) * 3;
              int boxCol = (col / 3) * 3;
              for (int i = 0; i < 3; i++) {
                  for (int j = 0; j < 3; j++) {
                      if (grid[boxRow + i][boxCol + j] == num) return false;
                  }
              }
              return true;
          }

          static boolean solve(int[][] grid) {
              for (int row = 0; row < 9; row++) {
                  for (int col = 0; col < 9; col++) {
                      if (grid[row][col] == 0) {
                          for (int num = 1; num <= 9; num++) {
                              if (isValid(grid, row, col, num)) {
                                  grid[row][col] = num;
                                  if (solve(grid)) return true;
                                  grid[row][col] = 0;
                              }
                          }
                          return false;
                      }
                  }
              }
              return true;
          }

          static long suDoku() {
              long sum = 0;
              try (BufferedReader br = new BufferedReader(new FileReader("src/p096_sudoku.txt"))) {
                  String line;
                  while ((line = br.readLine()) != null) {
                      if (line.startsWith("Grid")) continue;
                      int[][] grid = new int[9][9];
                      for (int j = 0; j < 9; j++) {
                          grid[0][j] = line.charAt(j) - '0';
                      }
                      for (int i = 1; i < 9; i++) {
                          line = br.readLine();
                          for (int j = 0; j < 9; j++) {
                              grid[i][j] = line.charAt(j) - '0';
                          }
                      }
                      solve(grid);
                      int num = grid[0][0] * 100 + grid[0][1] * 10 + grid[0][2];
                      sum += num;
                  }
              } catch (IOException e) {
                  return 0;
              }
              return sum;
          }
      }
    githubLink: https://github.com/tvarley/euler/blob/master/java/src/euler096.java
    performance: ~200ms
  - language: javascript
    code: |
      const fs = require('fs');

      function is_valid(board, row, col, num) {
        const box_row = Math.floor(row / 3) * 3;
        const box_col = Math.floor(col / 3) * 3;
        for (let i = 0; i < 9; i++) {
          if (board[row][i] === num || board[i][col] === num || board[box_row + Math.floor(i / 3)][box_col + i % 3] === num) {
            return false;
          }
        }
        return true;
      }

      function solve(board) {
        for (let row = 0; row < 9; row++) {
          for (let col = 0; col < 9; col++) {
            if (board[row][col] === 0) {
              for (let num = 1; num <= 9; num++) {
                if (is_valid(board, row, col, num)) {
                  board[row][col] = num;
                  if (solve(board)) return true;
                  board[row][col] = 0;
                }
              }
              return false;
            }
          }
        }
        return true;
      }

      function sudoku() {
        const data = fs.readFileSync('src/euler/p096_sudoku.txt', 'utf8');
        const lines = data.trim().split('\n');
        let sum = 0;
        for (let i = 0; i < lines.length; i += 10) {
          const board = [];
          for (let j = 1; j <= 9; j++) {
            board.push(lines[i + j].split('').map(Number));
          }
          solve(board);
          sum += board[0][0] * 100 + board[0][1] * 10 + board[0][2];
        }
        return sum;
      }
    githubLink: https://github.com/tvarley/euler/blob/master/javascript/src/euler/solution096.js
    performance: ~200ms
  - language: python
    code: |
      def solve_sudoku(grid):
          def is_valid(row, col, num):
              for i in range(9):
                  if grid[row][i] == num or grid[i][col] == num:
                      return False
              start_row = (row // 3) * 3
              start_col = (col // 3) * 3
              for i in range(3):
                  for j in range(3):
                      if grid[start_row + i][start_col + j] == num:
                          return False
              return True
          def backtrack():
              for row in range(9):
                  for col in range(9):
                      if grid[row][col] == 0:
                          for num in range(1, 10):
                              if is_valid(row, col, num):
                                  grid[row][col] = num
                                  if backtrack():
                                      return True
                                  grid[row][col] = 0
                          return False
              return True
          backtrack()
          return int(''.join(map(str, grid[0][:3])))

      def solve():
          total = 0
          with open('../cpp/src/p096_sudoku.txt') as f:
              lines = f.readlines()
          i = 0
          while i < len(lines):
              if lines[i].startswith('Grid'):
                  grid = []
                  for j in range(9):
                      grid.append([int(x) for x in lines[i+1+j].strip()])
                  total += solve_sudoku(grid)
                  i += 10
              else:
                  i += 1
          return total
    githubLink: https://github.com/tvarley/euler/blob/master/python/src/euler096.py
    performance: ~1000ms
  - language: rust
    code: |
      use std::fs;

      fn is_valid(grid: &Vec<Vec<i32>>, row: usize, col: usize, num: i32) -> bool {
          for i in 0..9 {
              if grid[row][i] == num || grid[i][col] == num {
                  return false;
              }
          }
          let box_row = (row / 3) * 3;
          let box_col = (col / 3) * 3;
          for i in 0..3 {
              for j in 0..3 {
                  if grid[box_row + i][box_col + j] == num {
                      return false;
                  }
              }
          }
          true
      }

      fn solve(grid: &mut Vec<Vec<i32>>) -> bool {
          for row in 0..9 {
              for col in 0..9 {
                  if grid[row][col] == 0 {
                      for num in 1..=9 {
                          if is_valid(grid, row, col, num) {
                              grid[row][col] = num;
                              if solve(grid) {
                                  return true;
                              }
                              grid[row][col] = 0;
                          }
                      }
                      return false;
                  }
              }
          }
          true
      }

      pub fn su_doku() -> usize {
          let data = fs::read_to_string("src/p096_sudoku.txt").unwrap();
          let lines: Vec<&str> = data.trim().split('\n').collect();
          let mut sum = 0;
          let mut i = 0;
          while i < lines.len() {
              if lines[i].starts_with("Grid") {
                  i += 1;
                  continue;
              }
              let mut grid: Vec<Vec<i32>> = vec![vec![0; 9]; 9];
              for j in 0..9 {
                  let line = lines[i + j];
                  for k in 0..9 {
                      grid[j][k] = line.as_bytes()[k] as i32 - b'0' as i32;
                  }
              }
              solve(&mut grid);
              let num = (grid[0][0] * 100 + grid[0][1] * 10 + grid[0][2]) as usize;
              sum += num;
              i += 9;
          }
          sum
      }
    githubLink: https://github.com/tvarley/euler/blob/master/rust/src/euler096.rs
    performance: ~1000ms
tags:
  - backtracking
  - sudoku
  - constraint satisfaction
featured: false
showcase: false
---

## Solution Notes

### Mathematical Background

Sudoku is a constraint satisfaction problem requiring each row, column, and 3x3 box to contain digits 1-9 exactly once. The problem involves solving 50 Sudoku puzzles and summing the 3-digit numbers from the top-left corner of each solution.

### Algorithm Analysis

Backtracking solver tries numbers 1-9 in empty cells, validating row/column/box constraints. Recursively attempts placements until grid is filled or backtracks on invalid choices.

### Performance

Extremely fast (~200ms in compiled languages) due to small grid size and efficient constraint checking. Python slower due to interpreted nature.

### Key Insights

- Backtracking with early constraint validation avoids exploring invalid states
- File parsing handles puzzle format with grid headers
- Sum extraction from solved top-left corner

### Educational Value

Demonstrates backtracking algorithms for NP-complete problems, file I/O in multiple languages, and constraint propagation techniques.