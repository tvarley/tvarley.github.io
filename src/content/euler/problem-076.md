---
problemNumber: 76
title: "Counting Summations"
description: |
  It is possible to write five as a sum in exactly six different ways:

  4 + 1
  3 + 2
  3 + 1 + 1
  2 + 2 + 1
  2 + 1 + 1 + 1
  1 + 1 + 1 + 1 + 1

  How many different ways can one hundred be written as a sum of at least two positive integers?
difficulty: "medium"
date: 2026-04-12
technologies: ["cpp", "go", "java", "javascript", "python", "rust"]
implementations:
  - language: "cpp"
    code: |
      #include <iostream>
      #include <vector>

      int counting_summations() {
          const int N = 100;
          std::vector<long long> p(N + 1, 0);
          p[0] = 1;
          for (int i = 1; i <= N; ++i) {
              for (int j = i; j <= N; ++j) {
                  p[j] += p[j - i];
              }
          }
          return p[N] - 1;
      }

      #if ! defined UNITTEST_MODE
      int main(int argc, char const *argv[]) {
          std::cout << counting_summations() << std::endl;
      }
      #endif
    githubLink: "https://github.com/tvarley/euler/blob/master/cpp/src/euler076.cpp"
    performance: "O(n²) time complexity"
  - language: "go"
    code: |
      package main

      import "fmt"

      func countingSummations() int {
          const n = 100
          dp := make([]int, n+1)
          dp[0] = 1
          for i := 1; i <= n; i++ {
              for j := i; j <= n; j++ {
                  dp[j] += dp[j-i]
              }
          }
          return dp[n] - 1
      }

      func main() {
          fmt.Println(countingSummations())
      }
    githubLink: "https://github.com/tvarley/euler/blob/master/go/euler076.go"
    performance: "O(n²) time complexity, execution ~1ms"
  - language: "java"
    code: |
      package org.tvarley.euler.solutions;

      import org.tvarley.euler.Solution;

      public class Solution076 implements Solution {
        public String solve() {
          final int N = 100;
          long[] p = new long[N + 1];
          p[0] = 1;
          for (int i = 1; i <= N; ++i) {
            for (int j = i; j <= N; ++j) {
              p[j] += p[j - i];
            }
          }
          return String.valueOf(p[N] - 1);
        }
      }
    githubLink: "https://github.com/tvarley/euler/blob/master/java/src/main/java/org/tvarley/euler/solutions/Solution076.java"
    performance: "O(n²) time complexity"
  - language: "javascript"
    code: |
      function countingSummations() {
        const N = 100;
        const p = new Array(N + 1).fill(0n);
        p[0] = 1n;
        for (let i = 1; i <= N; ++i) {
          for (let j = i; j <= N; ++j) {
            p[j] += p[j - i];
          }
        }
        return p[N] - 1n;
      }

      module.exports = {
        answer: () => countingSummations()
      };
    githubLink: "https://github.com/tvarley/euler/blob/master/javascript/src/euler/solution076.js"
    performance: "O(n²) time complexity, execution ~10ms"
  - language: "python"
    code: |
      def solve():
          n = 100
          dp = [0] * (n + 1)
          dp[0] = 1
          for i in range(1, n + 1):
              for j in range(i, n + 1):
                  dp[j] += dp[j - i]
          return dp[n] - 1

      if __name__ == "__main__":
          print(solve())
    githubLink: "https://github.com/tvarley/euler/blob/master/python/src/euler076.py"
    performance: "O(n²) time complexity, execution ~100ms"
  - language: "rust"
    code: |
      pub fn counting_summations() -> u64 {
          const N: usize = 100;
          let mut ways = vec![0u64; N + 1];
          ways[0] = 1;
          for i in 1..=N {
              for j in i..=N {
                  ways[j] += ways[j - i];
              }
          }
          ways[N] - 1
      }

      #[cfg(test)]
      mod tests {
          use super::*;

          #[test]
          fn euler_076() {
              assert_eq!(counting_summations(), 190569291);
          }
      }
    githubLink: "https://github.com/tvarley/euler/blob/master/rust/src/euler076.rs"
    performance: "O(n²) time complexity, execution ~0ms"
tags: ["euler", "partitions", "dynamic programming"]
featured: false
showcase: false
---

## Solution Notes

### Mathematical Background

The problem asks for the number of ways to write 100 as a sum of positive integers, where order doesn't matter, minus the trivial case of 100 itself.

This relates to the partition function p(n), which counts the number of distinct partitions of n. The partition function p(n) gives the number of ways to write n as a sum of positive integers where order doesn't matter.

The solution uses dynamic programming to compute p(n), then subtracts 1 to exclude the partition consisting of n itself.

### Algorithm Analysis

The implementations use a dynamic programming approach where dp[j] represents the number of ways to sum to j.

Initialize dp[0] = 1 (one way to sum to 0: nothing).

For each possible summand i from 1 to n, update dp[j] for j from i to n by adding dp[j - i].

This counts ordered partitions, but since we're dealing with sums where order doesn't matter for the problem (as the examples show unordered), but the DP counts ordered, but for the partition function, it's the same.

The DP actually computes the number of unrestricted partitions.

Yes, the code computes p(n), the partition function.

Subtract 1 for the single number case.

### Performance Analysis

- **Time Complexity**: O(n²) due to nested loops over n
- **Space Complexity**: O(n) for the DP array
- **Execution Time**: Fast for n=100, milliseconds on modern hardware
- **Scalability**: Quadratic, suitable for small n like 100

### Key Insights

- The partition function grows very rapidly
- Dynamic programming provides an efficient way to compute partitions
- Subtracting 1 excludes the trivial partition

### Educational Value

This problem introduces:
- The concept of integer partitions
- Dynamic programming for counting problems
- The difference between ordered and unordered partitions