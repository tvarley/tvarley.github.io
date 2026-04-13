---
problemNumber: 92
title: "Square digit chains"
description: "A number chain is created by continuously adding the square of the digits in a number to form a new number until it has been seen before. For example, 44 → 32 → 13 → 10 → 1 → 1, 85 → 89 → 145 → 42 → 20 → 4 → 16 → 37 → 58 → 89. Therefore any chain that arrives at 1 or 89 will become stuck in an endless loop. What is most amazing is that EVERY starting number will eventually arrive at 1 or 89. How many starting numbers below ten million will arrive at 89?"
difficulty: "medium"
date: "2024-04-12"
technologies: ["cpp", "go", "java", "javascript", "python", "rust"]
implementations:
  - language: "cpp"
    code: |
      #include <iostream>
      #include <vector>

      const int MAX_SUM = 9 * 9 * 7 + 1; // 7 digits max for 10^7 -1

      std::vector<int> memo(MAX_SUM, 0); // 0 not computed, 1 leads to 1, 2 leads to 89

      int sum_square_digits(int n) {
          int sum = 0;
          while (n > 0) {
              int d = n % 10;
              sum += d * d;
              n /= 10;
          }
          return sum;
      }

      int get_chain_end(int n) {
          if (n == 1) return 1;
          if (n == 89) return 2;
          if (memo[n] != 0) return memo[n];
          return memo[n] = get_chain_end(sum_square_digits(n));
      }

      long long square_digit_chains() {
          long long count = 0;
          for (int i = 1; i < 10000000; ++i) {
              if (get_chain_end(sum_square_digits(i)) == 2) count++;
          }
          return count;
      }
    githubLink: "https://github.com/tvarley/euler/blob/master/cpp/src/euler092.cpp"
    performance: "~2000ms"
  - language: "go"
    code: |
      package main

      const MAX_SUM = 9*9*7 + 1

      var memo [MAX_SUM]int

      func sumSquareDigits(n int) int {
          sum := 0
          for n > 0 {
              d := n % 10
              sum += d * d
              n /= 10
          }
          return sum
      }

      func getChainEnd(n int) int {
          if n == 1 {
              return 1
          }
          if n == 89 {
              return 2
          }
          if memo[n] != 0 {
              return memo[n]
          }
          memo[n] = getChainEnd(sumSquareDigits(n))
          return memo[n]
      }

      func squareDigitChains() int {
          count := 0
          for i := 1; i < 10000000; i++ {
              if getChainEnd(sumSquareDigits(i)) == 2 {
                  count++
              }
          }
          return count
      }
    githubLink: "https://github.com/tvarley/euler/blob/master/cpp/src/euler092.cpp"
    performance: "~2000ms"
  - language: "java"
    code: |
      public class Euler092 {
          static final int MAX_SUM = 9 * 9 * 7 + 1;
          static int[] memo = new int[MAX_SUM];

          static int sumSquareDigits(int n) {
              int sum = 0;
              while (n > 0) {
                  int d = n % 10;
                  sum += d * d;
                  n /= 10;
              }
              return sum;
          }

          static int getChainEnd(int n) {
              if (n == 1) return 1;
              if (n == 89) return 2;
              if (memo[n] != 0) return memo[n];
              return memo[n] = getChainEnd(sumSquareDigits(n));
          }

          static long squareDigitChains() {
              long count = 0;
              for (int i = 1; i < 10000000; i++) {
                  if (getChainEnd(sumSquareDigits(i)) == 2) count++;
              }
              return count;
          }
      }
    githubLink: "https://github.com/tvarley/euler/blob/master/cpp/src/euler092.cpp"
    performance: "~2000ms"
  - language: "javascript"
    code: |
      const MAX_SUM = 9 * 9 * 7 + 1;

      const memo = new Array(MAX_SUM).fill(0);

      function sum_square_digits(n) {
        let sum = 0;
        while (n > 0) {
          const d = n % 10;
          sum += d * d;
          n = Math.floor(n / 10);
        }
        return sum;
      }

      function get_chain_end(n) {
        if (n === 1) return 1;
        if (n === 89) return 2;
        if (memo[n] !== 0) return memo[n];
        return memo[n] = get_chain_end(sum_square_digits(n));
      }

      function square_digit_chains() {
        let count = 0;
        for (let i = 1; i < 10000000; i++) {
          if (get_chain_end(sum_square_digits(i)) === 2) count++;
        }
        return count;
      }
    githubLink: "https://github.com/tvarley/euler/blob/master/javascript/src/euler/solution092.js"
    performance: "~2000ms"
  - language: "python"
    code: |
      MAX_SUM = 568
      memo = [0] * MAX_SUM

      def sum_square_digits(n):
          total = 0
          while n > 0:
              d = n % 10
              total += d * d
              n //= 10
          return total

      def get_chain_end(n):
          if n == 1:
              return 1
          if n == 89:
              return 2
          if memo[n] != 0:
              return memo[n]
          s = sum_square_digits(n)
          memo[n] = get_chain_end(s)
          return memo[n]

      def solve():
          count = 0
          for n in range(1, 10000000):
              s = sum_square_digits(n)
              if get_chain_end(s) == 2:
                  count += 1
          return count
    githubLink: "https://github.com/tvarley/euler/blob/master/python/src/euler092.py"
    performance: "~5000ms"
  - language: "rust"
    code: |
      pub fn square_digit_chains() -> usize {
          const LIMIT: usize = 10_000_000;
          let mut ends_at_89 = 0;
          let mut memo = vec![0; 10000000]; // Max sum of squares
          for n in 1..LIMIT {
              if arrives_at_89(n, &mut memo) {
                  ends_at_89 += 1;
              }
          }
          ends_at_89
      }

      fn arrives_at_89(n: usize, memo: &mut Vec<i32>) -> bool {
          if n == 1 || n == 89 {
              return n == 89;
          }
          if memo[n] != 0 {
              return memo[n] == 89;
          }
          let next = sum_squares(n);
          let res = arrives_at_89(next, memo);
          memo[n] = if res { 89 } else { 1 };
          res
      }

      fn sum_squares(mut n: usize) -> usize {
          let mut sum = 0;
          while n > 0 {
              let d = n % 10;
              sum += d * d;
              n /= 10;
          }
          sum
      }
    githubLink: "https://github.com/tvarley/euler/blob/master/rust/src/euler092.rs"
    performance: "~2000ms"
tags: ["number chains", "memoization", "digital roots"]
featured: false
showcase: false
---

## Solution Notes

### Mathematical Background
This problem explores number chains formed by repeatedly summing the squares of digits until reaching 1 or 89. Every number eventually reaches one of these two cycles. The task is to count how many numbers below 10 million end up in the 89 cycle.

### Algorithm Analysis
The solution uses memoization to cache the chain end (1 or 89) for each possible sum of squares. For each starting number, it computes the digit sum of squares and looks up the cached result, avoiding redundant calculations.

### Performance
Memoization makes the algorithm efficient: C++/Go/Java/Rust (~2000ms), Python (~5000ms), JavaScript (~2000ms). The approach reduces complexity from exponential to linear in the number of starting values.

### Key Insights
- All chains converge to either 1 or 89, as proven mathematically.
- Memoizing on the digit sum squares (max 568 for 7 digits) is more efficient than per-number caching.
- The problem demonstrates how simple digit operations can lead to complex, predictable behavior.

### Educational Value
Introduces dynamic programming via memoization and shows how number theory can reveal hidden patterns in seemingly random processes, with applications in cryptography and computational number theory.