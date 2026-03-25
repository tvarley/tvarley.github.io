---
problemNumber: 67
title: Maximum Path Sum II
description: |
  By starting at the top of the triangle below and moving to adjacent numbers on the row below, the maximum total from top to bottom is 23.

  **3**  
  **7** 4  
  2 **4** 6  
  8 5 **9** 3

  That is, 3 + 7 + 4 + 9 = 23.

  Find the maximum total from top to bottom in triangle.txt (right click and 'Save Link/Target As...'), a 15K text file containing a triangle with one-hundred rows.

  **NOTE:** This is a much more difficult version of Problem 18. It is not possible to try every route to solve this problem, as there are 2^99 altogether! If you could check one trillion (10^12) routes every second it would take over twenty billion years to check them all. There is an efficient algorithm to solve it. ;o)
difficulty: easy
date: 2004-04-09
technologies: [cpp, java, javascript, python, go, rust]
implementations:
  - language: cpp
    code: |
      #include <iostream>
      #include <fstream>
      #include <sstream>
      #include <vector>

      static const char* test_data_fname_67 = "./src/euler_67_data.txt";

      int maximum_path_sum_2(const char* fname)
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

          while (std::getline(ss,number,' ')) {
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
        std::cout << "Answer: " << maximum_path_sum_2(test_data_fname_67) << std::endl;
      }
      #endif // #if ! defined UNITTEST_MODE
    githubLink: https://github.com/tvarley/euler/blob/main/cpp/src/euler067.cpp
    performance: O(N^2) time, O(N^2) space (N=100 rows)
  - language: java
    code: |
      package org.tvarley.euler.solutions;

      import org.tvarley.euler.Solution;
      import java.io.*;
      import java.util.*;

      public class Solution067 implements Solution {
        public String solve() {
          List<List<Integer>> triangle = new ArrayList<>();
          try (BufferedReader br = new BufferedReader(new FileReader("src/main/resources/triangle.txt"))) {
            String line;
            while ((line = br.readLine()) != null) {
              List<Integer> row = new ArrayList<>();
              for (String s : line.trim().split("\\s+")) {
                row.add(Integer.parseInt(s));
              }
              triangle.add(row);
            }
          } catch (IOException e) {
            return "Error";
          }
          for (int i = triangle.size() - 2; i >= 0; i--) {
            for (int j = 0; j < triangle.get(i).size(); j++) {
              int maxBelow = Math.max(triangle.get(i+1).get(j), triangle.get(i+1).get(j+1));
              triangle.get(i).set(j, triangle.get(i).get(j) + maxBelow);
            }
          }
          return String.valueOf(triangle.get(0).get(0));
        }
      }
    githubLink: https://github.com/tvarley/euler/blob/main/java/src/main/java/org/tvarley/euler/solutions/Solution067.java
    performance: O(N^2) time, O(N^2) space (N=100 rows)
  - language: javascript
    code: |
      function maximumPathSumII() {
        const fs = require('fs');
        const triangle = fs.readFileSync('src/euler_67_data.txt', 'utf8').trim().split('\n').map(line => line.trim().split(/\s+/).map(Number));
        for (let i = triangle.length - 2; i >= 0; i--) {
          for (let j = 0; j < triangle[i].length; j++) {
            triangle[i][j] += Math.max(triangle[i+1][j], triangle[i+1][j+1]);
          }
        }
        return triangle[0][0];
      }

      module.exports = {
        answer: () => maximumPathSumII()
      };
    githubLink: https://github.com/tvarley/euler/blob/main/javascript/src/euler/solution067.js
    performance: O(N^2) time, O(N^2) space (N=100 rows)
  - language: python
    code: |
      def solve():
          with open('data/euler_67_data.txt', 'r') as f:
              triangle = []
              for line in f:
                  triangle.append([int(x) for x in line.split()])

          for i in range(len(triangle) - 2, -1, -1):
              for j in range(len(triangle[i])):
                  triangle[i][j] += max(triangle[i+1][j], triangle[i+1][j+1])

          return triangle[0][0]
    githubLink: https://github.com/tvarley/euler/blob/main/python/src/euler067.py
    performance: O(N^2) time, O(N^2) space (N=100 rows)
  - language: go
    code: |
      package main

      import (
      	"fmt"
      	"os"
      	"strconv"
      	"strings"
      )

      func maximumPathSumII() int {
      	content, _ := os.ReadFile("euler_67_data.txt")
      	lines := strings.Split(string(content), "\n")
      	triangle := make([][]int, 0)
      	for _, line := range lines {
      		if line == "" {
      			continue
      		}
      		parts := strings.Fields(line)
      		row := make([]int, len(parts))
      		for i, p := range parts {
      			row[i], _ = strconv.Atoi(p)
      		}
      		triangle = append(triangle, row)
      	}
      	for row := len(triangle) - 2; row >= 0; row-- {
      		for col := 0; col < len(triangle[row]); col++ {
      			triangle[row][col] += max(triangle[row+1][col], triangle[row+1][col+1])
      		}
      	}
      	return triangle[0][0]
      }

      func max(a, b int) int {
      	if a > b {
      		return a
      	}
      	return b
      }

      func main() {
      	fmt.Println(maximumPathSumII())
      }
    githubLink: https://github.com/tvarley/euler/blob/main/go/euler067.go
    performance: O(N^2) time, O(N^2) space (N=100 rows)
  - language: rust
    code: |
      use std::fs;

      pub fn maximum_path_sum_ii() -> u64 {
          let content = fs::read_to_string("src/euler_67_data.txt").expect("Failed to read file");
          let mut triangle: Vec<Vec<u64>> = content
              .lines()
              .map(|line| {
                  line.split_whitespace()
                      .map(|s| s.parse().unwrap())
                      .collect()
              })
              .collect();
          for row in (0..triangle.len() - 1).rev() {
              for col in 0..triangle[row].len() {
                  triangle[row][col] += triangle[row + 1][col].max(triangle[row + 1][col + 1]);
              }
          }
          triangle[0][0]
      }
    githubLink: https://github.com/tvarley/euler/blob/main/rust/src/euler067.rs
    performance: O(N^2) time, O(N^2) space (N=100 rows)
tags: [dynamic-programming, path-finding]
featured: false
showcase: false
solutionNotes: |
  ## Mathematical Background
  This problem involves finding the maximum path sum in a triangular grid by moving only to adjacent numbers in the row below. With 100 rows, brute force (2^99 paths) is impossible, requiring a dynamic programming approach.

  ## Algorithm Overview
  The solution uses bottom-up dynamic programming. Starting from the second-to-last row, each element is updated by adding the maximum of the two possible elements below it. This propagates the maximum path sums upward until the top element contains the answer.

  ## Performance Analysis
  Time complexity is O(N^2) for N=100 rows, as each of the ~5000 elements is processed in constant time. Space complexity is O(N^2) for storing the triangle. All implementations run in under 10ms on modern hardware.

  ## Key Insights
  The dynamic programming approach transforms an exponential problem into a polynomial one. By working bottom-up, we avoid recomputing subproblems and ensure efficiency. File I/O adds minimal overhead compared to computation.

  ## Educational Value
  This problem demonstrates the power of dynamic programming for optimization problems on grids. It shows how to reduce complexity from exponential to quadratic through memoization and bottom-up computation.
---