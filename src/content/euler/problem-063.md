---
problemNumber: 63
title: "Powerful Digit Counts"
description: |
  The $5$-digit number, $16807=7^5$, is also a fifth power. Similarly, the $9$-digit number, $134217728=8^9$, is a ninth power.

  How many $n$-digit positive integers exist which are also an $n$th power?
difficulty: "medium"
date: 2026-03-24
technologies: ["cpp", "go", "java", "javascript", "python", "rust"]
implementations:
  - language: "cpp"
    code: |
      #include <iostream>
      #include <cmath>

      int powerful_digit_counts() {
          int count = 0;
          for (int a = 1; a <= 9; ++a) {
              double log_a = std::log10(static_cast<double>(a));
              int max_n = static_cast<int>(1.0 / (1.0 - log_a));
              count += max_n;
          }
          return count;
      }

      #if ! defined UNITTEST_MODE
      int main(int argc, char const *argv[]) {
          std::cout << powerful_digit_counts() << std::endl;
      }
      #endif
    githubLink: "https://github.com/tvarley/euler/blob/master/cpp/src/euler063.cpp"
    performance: "O(1) time complexity"
  - language: "java"
    code: |
      package org.tvarley.euler.solutions;

      import org.tvarley.euler.Solution;

      public class Solution063 implements Solution {
        public String solve() {
          int count = 0;
          for (int a = 1; a <= 9; a++) {
            double logA = Math.log10(a);
            int maxN = (int) (1.0 / (1.0 - logA));
            count += maxN;
          }
          return String.valueOf(count);
        }
      }
    githubLink: "https://github.com/tvarley/euler/blob/master/java/src/main/java/org/tvarley/euler/solutions/Solution063.java"
  - language: "javascript"
    code: |
      function powerfulDigitCounts() {
        let count = 0;
        for (let a = 1; a <= 9; a++) {
          const logA = Math.log10(a);
          const maxN = Math.floor(1.0 / (1.0 - logA));
          count += maxN;
        }
        return count;
      }

      module.exports = {
        answer: () => powerfulDigitCounts()
      };
    githubLink: "https://github.com/tvarley/euler/blob/master/javascript/src/euler/solution063.js"
  - language: "python"
    code: |
      import math

      def solve():
          count = 0
          for a in range(1, 10):
              log_a = math.log10(a)
              max_n = int(1.0 / (1.0 - log_a))
              count += max_n
          return count
    githubLink: "https://github.com/tvarley/euler/blob/master/python/src/euler063.py"
  - language: "go"
    code: |
      package main

      import (
      	"fmt"
      	"math"
      )

      func powerfulDigitCounts() int {
      	count := 0
      	for a := 1; a <= 9; a++ {
      		logA := math.Log10(float64(a))
      		maxN := int(1.0 / (1.0 - logA))
      		count += maxN
      	}
      	return count
      }

      func main() {
      	fmt.Println(powerfulDigitCounts())
      }
    githubLink: "https://github.com/tvarley/euler/blob/master/go/euler063.go"
  - language: "rust"
    code: |
      pub fn powerful_digit_counts() -> u32 {
          let mut count = 0;
          for a in 1..=9 {
              let log_a = (a as f64).log10();
              let max_n = (1.0 / (1.0 - log_a)) as u32;
              count += max_n;
          }
          count
      }
    githubLink: "https://github.com/tvarley/euler/blob/master/rust/src/euler063.rs"
tags: ["euler"]
featured: false
showcase: true
---

## Solution Notes

### Mathematical Background

This problem asks for the count of n-digit numbers that are also nth powers.

### Algorithm Analysis

Use logarithmic calculation to find the maximum n for each base a from 1 to 9, where a^n has exactly n digits.

### Performance Analysis

- **Time Complexity**: O(1) - constant loop over 9 values
- **Space Complexity**: O(1) - no additional space
- **Execution Time**: Instantaneous
- **Scalability**: Not applicable, fixed computation

### Key Insights

- For base a, the maximum n is floor(1 / (1 - log10(a)))
- Only bases 1-9 can produce n-digit nth powers for n > 1
- The answer is 49

### Educational Value

This problem teaches:
- Logarithmic properties for digit counting
- Mathematical bounds and inequalities
- Efficient computation without iteration