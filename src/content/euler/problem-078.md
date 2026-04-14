---
problemNumber: 78
title: "Coin Partitions"
description: |
  Let p(n) represent the number of different ways in which n coins can be separated into piles. For example, five coins can be separated into piles in exactly seven different ways, so p(5)=7.

  OOOOO

  OOOO | O

  OOO | OO

  OOO | O |  O

  OO | OO | O

  OO | O | O | O

  O | O | O | O | O

  Find the least value of n for which p(n) is divisible by one million.
difficulty: "hard"
date: 2026-04-12
technologies: ["cpp", "go", "java", "javascript", "python", "rust"]
implementations:
  - language: "cpp"
    code: |
      #include <iostream>
      #include <vector>

      int coin_partitions() {
          const int MOD = 1000000;
          const int MAXN = 100000;
          std::vector<long long> p(MAXN + 1, 0);
          p[0] = 1;
          for (int n = 1; n <= MAXN; ++n) {
              int i = 1;
              while (true) {
                  int pent1 = i * (3 * i - 1) / 2;
                  if (pent1 > n) break;
                  long long sign = (i % 2 == 1) ? 1LL : -1LL;
                  p[n] = (p[n] + sign * p[n - pent1]) % MOD;
                  int pent2 = i * (3 * i + 1) / 2;
                  if (pent2 > n) break;
                  p[n] = (p[n] + sign * p[n - pent2]) % MOD;
                  ++i;
              }
              p[n] = (p[n] % MOD + MOD) % MOD;
              if (p[n] == 0 && n > 0) return n;
          }
          return -1;
      }

      #if ! defined UNITTEST_MODE
      int main(int argc, char const *argv[]) {
          std::cout << coin_partitions() << std::endl;
      }
      #endif
    githubLink: "https://github.com/tvarley/euler/blob/master/cpp/src/euler078.cpp"
    performance: "O(n√n) time complexity"
  - language: "go"
    code: |
      package main

      import "fmt"

      func coinPartitions() int {
          const MOD = 1000000
          const LIMIT = 60000
          p := make([]int, LIMIT+1)
          p[0] = 1
          for n := 1; n <= LIMIT; n++ {
              sum := 0
              i := 1
              for {
                  g1 := i * (3*i - 1) / 2
                  if g1 > n {
                      break
                  }
                  sign := 1
                  if i%2 == 0 {
                      sign = -1
                  }
                  sum = (sum + sign*p[n-g1]) % MOD
                  if sum < 0 {
                      sum += MOD
                  }
                  g2 := i * (3*i + 1) / 2
                  if g2 > n {
                      break
                  }
                  sum = (sum + sign*p[n-g2]) % MOD
                  if sum < 0 {
                      sum += MOD
                  }
                  i++
              }
              p[n] = sum
              if p[n] == 0 {
                  return n
              }
          }
          return -1
      }

      func main() {
          fmt.Println(coinPartitions())
      }
    githubLink: "https://github.com/tvarley/euler/blob/master/go/euler078.go"
    performance: "O(n√n) time complexity, execution ~100ms"
  - language: "java"
    code: |
      package org.tvarley.euler.solutions;

      import org.tvarley.euler.Solution;

      public class Solution078 implements Solution {
        public String solve() {
          final int MOD = 1000000;
          final int MAXN = 100000;
          long[] p = new long[MAXN + 1];
          p[0] = 1;
          for (int n = 1; n <= MAXN; ++n) {
            int i = 1;
            while (true) {
              int pent1 = i * (3 * i - 1) / 2;
              if (pent1 > n) break;
              long sign = (i % 2 == 1) ? 1L : -1L;
              p[n] = (p[n] + sign * p[n - pent1]) % MOD;
              int pent2 = i * (3 * i + 1) / 2;
              if (pent2 > n) break;
              p[n] = (p[n] + sign * p[n - pent2]) % MOD;
              ++i;
            }
            p[n] = (p[n] % MOD + MOD) % MOD;
            if (p[n] == 0 && n > 0) return String.valueOf(n);
          }
          return "-1";
        }
      }
    githubLink: "https://github.com/tvarley/euler/blob/master/java/src/main/java/org/tvarley/euler/solutions/Solution078.java"
    performance: "O(n√n) time complexity"
  - language: "javascript"
    code: |
      function coinPartitions() {
        const MOD = 1000000n;
        const MAXN = 100000;
        const p = new Array(MAXN + 1).fill(0n);
        p[0] = 1n;
        for (let n = 1; n <= MAXN; ++n) {
          let i = 1;
          while (true) {
            const pent1 = i * (3 * i - 1) / 2;
            if (pent1 > n) break;
            const sign = (i % 2 === 1) ? 1n : -1n;
            p[n] = (p[n] + sign * p[n - pent1]) % MOD;
            const pent2 = i * (3 * i + 1) / 2;
            if (pent2 > n) break;
            p[n] = (p[n] + sign * p[n - pent2]) % MOD;
            ++i;
          }
          p[n] = (p[n] % MOD + MOD) % MOD;
          if (p[n] === 0n && n > 0) return n;
        }
        return -1;
      }

      module.exports = {
        answer: () => coinPartitions()
      };
    githubLink: "https://github.com/tvarley/euler/blob/master/javascript/src/euler/solution078.js"
    performance: "O(n√n) time complexity, execution ~2000ms"
  - language: "python"
    code: |
      def solve():
          MOD = 1000000
          def pentagonal(k):
              return k * (3 * k - 1) // 2
          limit = 60000
          p = [0] * (limit + 1)
          p[0] = 1
          for n in range(1, limit + 1):
              k = 1
              while True:
                  pk = pentagonal(k)
                  if pk > n:
                      break
                  sign = (-1) ** ((k + 1) % 2)
                  p[n] = (p[n] + sign * p[n - pk]) % MOD
                  pk = pentagonal(-k)
                  if pk > n:
                      break
                  sign = (-1) ** ((-k + 1) % 2)
                  p[n] = (p[n] + sign * p[n - pk]) % MOD
                  k += 1
              if p[n] == 0:
                  return n

      if __name__ == "__main__":
          print(solve())
    githubLink: "https://github.com/tvarley/euler/blob/master/python/src/euler078.py"
    performance: "O(n√n) time complexity, execution ~500ms"
  - language: "rust"
    code: |
      pub fn coin_partitions() -> u64 {
          const MOD: u64 = 1_000_000;
          let mut p = vec![0u64; 100000];
          p[0] = 1;
          let mut n = 1usize;
          loop {
              let mut sum = 0u64;
              let mut k = 1i64;
              loop {
                  let pent1 = k * (3 * k - 1) / 2;
                  let pent2 = k * (3 * k + 1) / 2;
                  if pent1 > n as i64 {
                      break;
                  }
                  let sign = if k % 2 == 1 { 1i64 } else { -1i64 };
                  let val1 = p[(n as i64 - pent1) as usize];
                  if sign == 1 {
                      sum = (sum + val1) % MOD;
                  } else {
                      sum = (sum + MOD - (val1 % MOD)) % MOD;
                  }
                  if pent2 <= n as i64 {
                      let val2 = p[(n as i64 - pent2) as usize];
                      if sign == 1 {
                          sum = (sum + val2) % MOD;
                      } else {
                          sum = (sum + MOD - (val2 % MOD)) % MOD;
                      }
                  }
                  k += 1;
              }
              p[n] = sum;
              if sum == 0 {
                  return n as u64;
              }
              n += 1;
          }
      }

      #[cfg(test)]
      mod tests {
          use super::*;

          #[test]
          fn euler_078() {
              assert_eq!(coin_partitions(), 55374);
          }
      }
    githubLink: "https://github.com/tvarley/euler/blob/master/rust/src/euler078.rs"
    performance: "O(n√n) time complexity, execution ~1000ms"
tags: ["euler", "partitions", "pentagonal numbers"]
featured: false
showcase: true
---

## Solution Notes

### Mathematical Background

The problem asks for the smallest n such that the partition function p(n) is divisible by 1,000,000.

The partition function p(n) counts the number of ways to write n as a sum of positive integers, ignoring order.

The solution uses the pentagonal number theorem, which gives a recurrence for p(n) using generalized pentagonal numbers.

### Algorithm Analysis

The recurrence is p(n) = sum over k of (-1)^{k-1} * p(n - pent(k)) where pent(k) = k(3k-1)/2.

We compute this modulo 1,000,000 to find when p(n) ≡ 0 mod 10^6.

### Performance Analysis

- **Time Complexity**: O(n√n) due to the inner loop over pentagonal numbers
- **Space Complexity**: O(n) for the partition array
- **Execution Time**: Moderate, around 1-2 seconds for n~50k
- **Scalability**: Efficient for this problem size

### Key Insights

- Uses modular arithmetic to avoid large numbers
- The answer is 55374, a large number requiring efficient computation

### Educational Value

This problem teaches:
- The partition function and its properties
- Pentagonal number theorem
- Modular arithmetic in combinatorial problems
