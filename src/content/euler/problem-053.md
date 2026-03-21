---
problemNumber: 53
title: "Combinatoric selections"
description: |
  There are exactly ten ways of selecting three from five, 12345:

  123, 124, 125, 134, 135, 145, 234, 235, 245, and 345

  In combinatorics, we use the notation, $\binom 5 3 = 10$.

  In general, $\binom n r = \dfrac{n!}{r!(n-r)!}$, where $r \le n$, $n! = n \times (n-1) \times ... \times 3 \times 2 \times 1$, and $0! = 1$.

  It is not until $n = 23$, that a value exceeds one-million: $\binom {23} {10} = 1144066$.

  How many, not necessarily distinct, values of $\binom n r$ for $1 \le n \le 100$, are greater than one-million?
difficulty: "medium"
date: 2026-03-20
technologies: ["cpp", "go", "java", "javascript", "python", "rust"]
implementations:
  - language: "cpp"
    code: |
      // https://projecteuler.net/problem=53
      // Combinatoric selections
      // There are exactly ten ways of selecting three from five, 12345: 123, 124, 125, 134, 135, 145, 234, 235, 245, and 345
      // In combinatorics, we use the notation, C(5,3) = 10.
      // In general, C(n,r) = n! / (r! * (n-r)!), where r ≤ n, n! = n×(n−1)×...×3×2×1, and 0! = 1.
      // It is not until n = 23, that a value exceeds one-million: C(23,10) = 1144066.
      // How many, not necessarily distinct, values of C(n,r) for 1 ≤ n ≤ 100, are greater than one-million?
      // Answer: 4075

      #include <iostream>

      long long factorial(int n) {
          long long res = 1;
          for (int i = 2; i <= n; ++i) res *= i;
          return res;
      }

      long long binom(int n, int r) {
          if (r > n - r) r = n - r;
          long long res = 1;
          for (int i = 0; i < r; ++i) {
              res *= (n - i);
              res /= (i + 1);
          }
          return res;
      }

      int combinatoric_selections() {
          int count = 0;
          for (int n = 1; n <= 100; ++n) {
              for (int r = 0; r <= n; ++r) {
                  if (binom(n, r) > 1000000) {
                      ++count;
                      break;
                  }
              }
          }
          return count;
      }

      #if ! defined UNITTEST_MODE
      int main() {
          std::cout << combinatoric_selections() << std::endl;
      }
      #endif
    githubLink: "https://github.com/tvarley/euler/blob/master/cpp/src/euler053.cpp"
    performance: "O(n^2) time complexity"
  - language: "go"
    code: |
      // https://projecteuler.net/problem=53
      //
      // Combinatoric Selections
      //
      // There are exactly ten ways of selecting three from five, 12345: 123, 124, 125, 134, 135, 145, 234, 235, 245, and 345
      // In combinatorics, we use the notation, \binom 5 3 = 10.
      // In general, \binom n r = \dfrac{n!}{r!(n-r)!}, where r \le n, n! = n \times (n-1) \times ... \times 3 \times 2 \times 1, and 0! = 1.
      // It is not until n = 23, that a value exceeds one-million: \binom {23} {10} = 1144066.
      // How many, not necessarily distinct, values of \binom n r for 1 \le n \le 100, are greater than one-million?
      //
      // Answer: 4075

      package main

      import (
      	"fmt"
      	"math/big"
      )

      func binomial(n, k int) *big.Int {
      	if k > n-k {
      		k = n - k
      	}
      	res := big.NewInt(1)
      	for i := 0; i < k; i++ {
      		res.Mul(res, big.NewInt(int64(n-i)))
      		res.Div(res, big.NewInt(int64(i+1)))
      	}
      	return res
      }

      func main() {
      	count := 0
      	limit := big.NewInt(1000000)
      	for n := 1; n <= 100; n++ {
      		for r := 0; r <= n; r++ {
      			if binomial(n, r).Cmp(limit) > 0 {
      				count++
      			}
      		}
      	}
      	fmt.Println(count)
      }
    githubLink: "https://github.com/tvarley/euler/blob/master/go/euler053.go"
  - language: "java"
    code: |
      /*
      Combinatoric Selections

      There are exactly ten ways of selecting three from five, 12345: 123, 124, 125, 134, 135, 145, 234, 235, 245, and 345
      In combinatorics, we use the notation, \binom 5 3 = 10.
      In general, \binom n r = \dfrac{n!}{r!(n-r)!}, where r \le n, n! = n \times (n-1) \times ... \times 3 \times 2 \times 1, and 0! = 1.
      It is not until n = 23, that a value exceeds one-million: \binom {23} {10} = 1144066.
      How many, not necessarily distinct, values of \binom n r for 1 \le n \le 100, are greater than one-million?

      Answer: 4075

      */
      package org.tvarley.euler.solutions;

      import org.tvarley.euler.Solution;
      import java.math.BigInteger;

      public class Solution053 implements Solution {
        public String solve() {
          int count = 0;
          BigInteger limit = BigInteger.valueOf(1000000);
          for (int n = 1; n <= 100; n++) {
            for (int r = 0; r <= n; r++) {
              if (binomial(n, r).compareTo(limit) > 0) {
                count++;
              }
            }
          }
          return Integer.toString(count);
        }

        private BigInteger binomial(int n, int k) {
          if (k > n - k) k = n - k;
          BigInteger res = BigInteger.ONE;
          for (int i = 0; i < k; i++) {
            res = res.multiply(BigInteger.valueOf(n - i));
            res = res.divide(BigInteger.valueOf(i + 1));
          }
          return res;
        }
      }
    githubLink: "https://github.com/tvarley/euler/blob/master/java/src/main/java/org/tvarley/euler/solutions/Solution053.java"
  - language: "javascript"
    code: |
      // https://projecteuler.net/problem=53
      // Combinatoric Selections
      // There are exactly ten ways of selecting three from five, 12345:
      // 123, 124, 125, 134, 135, 145, 234, 235, 245, and 345
      // In combinatorics, we use the notation, 5C3 = 10.
      // In general, nCr = n! / (r!(n-r)!), where r ≤ n, n! = n × (n-1) × ... × 3 × 2 × 1, and 0! = 1.
      // It is not until n = 23, that a value exceeds one-million: 23C10 = 1144066.
      // How many, not necessarily distinct, values of nCr for 1 ≤ n ≤ 100, are greater than one-million?
      // The final answer to the problem is 4075.

      const factorial = (n) => {
        let result = 1n;
        for (let i = 2n; i <= BigInt(n); i++) {
          result *= i;
        }
        return result;
      };

      const binomial = (n, r) => {
        if (r > n - r) r = n - r;
        let res = 1n;
        for (let i = 0; i < r; i++) {
          res = res * BigInt(n - i) / BigInt(i + 1);
        }
        return res;
      };

      module.exports = {
        answer: () => {
          let count = 0;
          for (let n = 1; n <= 100; n++) {
            for (let r = 0; r <= n; r++) {
              if (binomial(n, r) > 1000000n) count++;
            }
          }
          return count;
        }
      };
    githubLink: "https://github.com/tvarley/euler/blob/master/javascript/src/euler/solution053.js"
  - language: "python"
    code: |
      # https://projecteuler.net/problem=53
      # Combinatoric Selections
      # There are exactly ten ways of selecting three from five, 12345:
      # 123, 124, 125, 134, 135, 145, 234, 235, 245, and 345
      # In combinatorics, we use the notation, \binom 5 3 = 10.
      # In general, \binom n r = \dfrac{n!}{r!(n-r)!}, where r \le n, n! = n \times (n-1) \times ... \times 3 \times 2 \times 1, and 0! = 1.
      # It is not until n = 23, that a value exceeds one-million: \binom {23} {10} = 1144066.
      # How many, not necessarily distinct, values of \binom n r for 1 \le n \le 100, are greater than one-million?
      # Answer: 4075
      import math

      def solve():
          count = 0
          for n in range(23, 101):
              for r in range(n + 1):
                  if math.comb(n, r) > 1000000:
                      count += 1
          return count
    githubLink: "https://github.com/tvarley/euler/blob/master/python/src/euler053.py"
  - language: "rust"
    code: |
      // https://projecteuler.net/problem=53
      //
      // There are exactly ten ways of selecting three from five, 12345: 123, 124, 125, 134, 135, 145, 234, 235, 245, and 345
      // In combinatorics, we use the notation, \binom 5 3 = 10.
      // In general, \binom n r = \dfrac{n!}{r!(n-r)!}, where r \le n, n! = n \times (n-1) \times ... \times 3 \times 2 \times 1, and 0! = 1.
      // It is not until n = 23, that a value exceeds one-million: \binom {23} {10} = 1144066.
      // How many, not necessarily distinct, values of \binom n r for 1 \le n \le 100, are greater than one-million?
      //
      // Answer: 4075

      pub fn combinatoric_selections() -> u64 {
          let mut count = 0;
          for n in 1..=100 {
              for r in 0..=n {
                  if binomial(n, r) > 1000000 {
                      count += 1;
                  }
              }
          }
          count
      }

      fn binomial(n: u64, k: u64) -> u64 {
          if k > n { return 0; }
          let k = k.min(n - k);
          let mut res = 1u64;
          for i in 0..k {
              res = res.saturating_mul(n - i);
              res /= i + 1;
          }
          res
      }

      #[cfg(test)]
      mod tests {
          use super::*;

          #[test]
          fn euler_053() {
              assert_eq!(combinatoric_selections(), 4075);
          }
      }
    githubLink: "https://github.com/tvarley/euler/blob/master/rust/src/euler053.rs"
tags: ["euler"]
featured: false
showcase: false
---

## Solution Notes

### Mathematical Background

Explores [binomial coefficients](https://grokipedia.com/page/Binomial_coefficient) and [combinatorics](https://grokipedia.com/page/Combinatorics), building on [Pascal's triangle](https://grokipedia.com/page/Pascal%27s_triangle) patterns where entries grow rapidly.

### Algorithm Analysis

Uses multiplicative formula for C(n,r) to compute without full factorials, with early loop breaking when exceeding 1M threshold. Time complexity optimized to O(n^2 / 2) effectively.

### Key Insights

- Threshold crossed at n=23 with C(23,10)=1,144,066
- Central binomials grow fastest
- 4075 combinations exceed 1M for n≤100

### Educational Value

Bridges pure math with programming by demonstrating big integer avoidance techniques and efficient counting in combinatorial explosions. Perfect for understanding growth rates in probability and statistics.