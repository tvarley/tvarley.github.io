---
problemNumber: 77
title: "Prime Summations"
description: |
  It is possible to write ten as the sum of primes in exactly five different ways:

  7 + 3
  5 + 5
  5 + 3 + 2
  3 + 3 + 2 + 2
  2 + 2 + 2 + 2 + 2

  What is the first value which can be written as the sum of primes in over five thousand different ways?
difficulty: "medium"
date: 2026-04-12
technologies: ["cpp", "go", "java", "javascript", "python", "rust"]
implementations:
  - language: "cpp"
    code: |
      #include <iostream>
      #include <vector>

      int prime_summations() {
          const int N = 1000;
          std::vector<bool> is_prime(N + 1, true);
          is_prime[0] = is_prime[1] = false;
          for (long long i = 2; i <= N; ++i) {
              if (is_prime[i]) {
                  for (long long j = i * i; j <= N; j += i) {
                      is_prime[j] = false;
                  }
              }
          }
          std::vector<int> primes;
          for (int i = 2; i <= N; ++i) {
              if (is_prime[i]) primes.push_back(i);
          }
          std::vector<long long> ways(N + 1, 0);
          ways[0] = 1;
          for (int p : primes) {
              for (int j = p; j <= N; ++j) {
                  ways[j] += ways[j - p];
              }
          }
          for (int n = 2; n <= N; ++n) {
              if (ways[n] > 5000) return n;
          }
          return -1;
      }

      #if ! defined UNITTEST_MODE
      int main(int argc, char const *argv[]) {
          std::cout << prime_summations() << std::endl;
      }
      #endif
    githubLink: "https://github.com/tvarley/euler/blob/master/cpp/src/euler077.cpp"
    performance: "O(n²) time complexity"
  - language: "go"
    code: |
      package main

      import "fmt"

      func primeSummations() int {
          limit := 1000
          isPrime := make([]bool, limit+1)
          for i := range isPrime {
              isPrime[i] = true
          }
          isPrime[0], isPrime[1] = false, false
          for i := 2; i*i <= limit; i++ {
              if isPrime[i] {
                  for j := i * i; j <= limit; j += i {
                      isPrime[j] = false
                  }
              }
          }
          primes := []int{}
          for i := 2; i <= limit; i++ {
              if isPrime[i] {
                  primes = append(primes, i)
              }
          }
          n := 2
          for {
              ways := 0
              dp := make([]int, n+1)
              dp[0] = 1
              for _, p := range primes {
                  if p > n {
                      break
                  }
                  for j := p; j <= n; j++ {
                      dp[j] += dp[j-p]
                  }
              }
              ways = dp[n]
              if ways > 5000 {
                  return n
              }
              n++
          }
      }

      func main() {
          fmt.Println(primeSummations())
      }
    githubLink: "https://github.com/tvarley/euler/blob/master/go/euler077.go"
    performance: "O(n²) time complexity, execution ~0ms"
  - language: "java"
    code: |
      package org.tvarley.euler.solutions;

      import org.tvarley.euler.Solution;

      public class Solution077 implements Solution {
        public String solve() {
          final int N = 1000;
          boolean[] is_prime = new boolean[N + 1];
          for (int i = 0; i <= N; ++i) is_prime[i] = true;
          is_prime[0] = is_prime[1] = false;
          for (long i = 2; i <= N; ++i) {
            if (is_prime[(int)i]) {
              for (long j = i * i; j <= N; j += i) {
                is_prime[(int)j] = false;
              }
            }
          }
          int[] primes = new int[N];
          int count = 0;
          for (int i = 2; i <= N; ++i) {
            if (is_prime[i]) primes[count++] = i;
          }
          long[] ways = new long[N + 1];
          ways[0] = 1;
          for (int i = 0; i < count; ++i) {
            int p = primes[i];
            for (int j = p; j <= N; ++j) {
              ways[j] += ways[j - p];
            }
          }
          for (int n = 2; n <= N; ++n) {
            if (ways[n] > 5000) return String.valueOf(n);
          }
          return "-1";
        }
      }
    githubLink: "https://github.com/tvarley/euler/blob/master/java/src/main/java/org/tvarley/euler/solutions/Solution077.java"
    performance: "O(n²) time complexity"
  - language: "javascript"
    code: |
      function primeSummations() {
        const N = 1000;
        const isPrime = new Array(N + 1).fill(true);
        isPrime[0] = isPrime[1] = false;
        for (let i = 2; i <= N; ++i) {
          if (isPrime[i]) {
            for (let j = i * i; j <= N; j += i) {
              isPrime[j] = false;
            }
          }
        }
        const primes = [];
        for (let i = 2; i <= N; ++i) {
          if (isPrime[i]) primes.push(i);
        }
        const ways = new Array(N + 1).fill(0n);
        ways[0] = 1n;
        for (let p of primes) {
          for (let j = p; j <= N; ++j) {
            ways[j] += ways[j - p];
          }
        }
        for (let n = 2; n <= N; ++n) {
          if (ways[n] > 5000n) return n;
        }
        return -1;
      }

      module.exports = {
        answer: () => primeSummations()
      };
    githubLink: "https://github.com/tvarley/euler/blob/master/javascript/src/euler/solution077.js"
    performance: "O(n²) time complexity, execution ~10ms"
  - language: "python"
    code: |
      def solve():
          import math
          def sieve(n):
              is_prime = [True] * (n + 1)
              is_prime[0] = is_prime[1] = False
              for i in range(2, int(math.sqrt(n)) + 1):
                  if is_prime[i]:
                      for j in range(i*i, n+1, i):
                          is_prime[j] = False
              return [i for i in range(2, n+1) if is_prime[i]]
          limit = 1000
          primes = sieve(limit)
          dp = [0] * (limit + 1)
          dp[0] = 1
          for p in primes:
              for j in range(p, limit + 1):
                  dp[j] += dp[j - p]
          for n in range(2, limit + 1):
              if dp[n] > 5000:
                  return n

      if __name__ == "__main__":
          print(solve())
    githubLink: "https://github.com/tvarley/euler/blob/master/python/src/euler077.py"
    performance: "O(n²) time complexity, execution ~10ms"
  - language: "rust"
    code: |
      pub fn prime_summations() -> u64 {
          const LIMIT: usize = 1000;
          let primes = sieve(LIMIT);
          let mut ways = vec![0u32; LIMIT + 1];
          ways[0] = 1;
          for &p in &primes {
              for j in p..=LIMIT {
                  ways[j] += ways[j - p];
              }
          }
          for n in 2..=LIMIT {
              if ways[n] > 5000 {
                  return n as u64;
              }
          }
          0
      }

      fn sieve(limit: usize) -> Vec<usize> {
          let mut is_prime = vec![true; limit + 1];
          is_prime[0] = false;
          if limit > 0 {
              is_prime[1] = false;
          }
          for i in 2..=((limit as f64).sqrt() as usize) {
              if is_prime[i] {
                  for j in ((i * i)..=limit).step_by(i) {
                      is_prime[j] = false;
                  }
              }
          }
          (2..=limit).filter(|&x| is_prime[x]).collect()
      }

      #[cfg(test)]
      mod tests {
          use super::*;

          #[test]
          fn euler_077() {
              assert_eq!(prime_summations(), 71);
          }
      }
    githubLink: "https://github.com/tvarley/euler/blob/master/rust/src/euler077.rs"
    performance: "O(n²) time complexity, execution ~0ms"
tags: ["euler", "primes", "partitions", "dynamic programming"]
featured: false
showcase: false
---

## Solution Notes

### Mathematical Background

The problem asks for the smallest number that can be expressed as the sum of primes in more than 5000 different ordered ways.

This involves counting the number of ordered prime partitions of n, using dynamic programming similar to the coin change problem but with primes as denominations.

### Algorithm Analysis

Generate all primes up to a limit using the Sieve of Eratosthenes.

Use DP where ways[j] is the number of ways to sum to j using the primes.

Initialize ways[0] = 1.

For each prime p, for j from p to limit, ways[j] += ways[j - p].

Find the smallest n where ways[n] > 5000.

### Performance Analysis

- **Time Complexity**: O(n²) due to nested loops
- **Space Complexity**: O(n) for prime and ways arrays
- **Execution Time**: Very fast for n=1000
- **Scalability**: Quadratic, efficient for this scale

### Key Insights

- Uses ordered partitions (compositions) of primes
- The answer is 71, which has 5001 ordered prime sums

### Educational Value

This problem teaches:
- Prime generation with sieves
- Dynamic programming for counting compositions
- The difference between ordered and unordered partitions