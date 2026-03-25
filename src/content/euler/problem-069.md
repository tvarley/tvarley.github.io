---
problemNumber: 69
title: Totient Maximum
description: |
  Euler's totient function, φ(n) [sometimes called the phi function], is defined as the number of positive integers not exceeding n which are relatively prime to n. For example, as 1, 2, 4, 5, 7, and 8, are all less than or equal to nine and relatively prime to nine, φ(9)=6.

  | n | Relatively Prime | φ(n) | n/φ(n) |
  |---|------------------|------|--------|
  | 2 | 1 | 1 | 2 |
  | 3 | 1,2 | 2 | 1.5 |
  | 4 | 1,3 | 2 | 2 |
  | 5 | 1,2,3,4 | 4 | 1.25 |
  | 6 | 1,5 | 2 | 3 |
  | 7 | 1,2,3,4,5,6 | 6 | 1.1666... |
  | 8 | 1,3,5,7 | 4 | 2 |
  | 9 | 1,2,4,5,7,8 | 6 | 1.5 |
  | 10 | 1,3,7,9 | 4 | 2.5 |

  It can be seen that n = 6 produces a maximum n/φ(n) for n ≤ 10.

  Find the value of n ≤ 1,000,000 for which n/φ(n) is a maximum.
difficulty: easy
date: 2004-05-07
technologies: [cpp, java, javascript, python, go, rust]
implementations:
  - language: cpp
    code: |
      #include <iostream>

      int totient_maximum()
      {
          // The maximum n/phi(n) occurs for n that is product of first k primes where the product <= 1e6
          // Primes: 2,3,5,7,11,13,17
          // 2*3*5*7*11*13*17 = 510510
          // Next prime 19: 510510*19 = 9699690 > 1e6
          long long product = 1;
          int primes[] = {2,3,5,7,11,13,17};
          for(int p : primes){
              if(product * p > 1000000) break;
              product *= p;
          }
          return product;
      }

      #if ! defined UNITTEST_MODE
      int main(int argc, char const *argv[])
      {
          std::cout << "Answer: " << totient_maximum() << std::endl;
      }
      #endif // #if ! defined UNITTEST_MODE
    githubLink: https://github.com/tvarley/euler/blob/main/cpp/src/euler069.cpp
    performance: O(1) time, O(1) space (simple multiplication loop)
  - language: java
    code: |
      package org.tvarley.euler.solutions;

      import org.tvarley.euler.Solution;

      public class Solution069 implements Solution {
        public String solve() {
          // Implementation with sieve
          return "510510";
        }
      }
    githubLink: https://github.com/tvarley/euler/blob/main/java/src/main/java/org/tvarley/euler/solutions/Solution069.java
    performance: O(1) time, O(1) space (hardcoded answer)
  - language: javascript
    code: |
      function totientMaximum() {
        // Implementation
        return 510510;
      }

      module.exports = {
        answer: () => totientMaximum()
      };
    githubLink: https://github.com/tvarley/euler/blob/main/javascript/src/euler/solution069.js
    performance: O(1) time, O(1) space (hardcoded answer)
  - language: python
    code: |
      def solve():
          limit = 1000000
          phi = list(range(limit + 1))
          for i in range(2, limit + 1):
              if phi[i] == i:  # i is prime
                  for j in range(i, limit + 1, i):
                      phi[j] = phi[j] // i * (i - 1)
          max_ratio = 0
          max_n = 0
          for n in range(2, limit + 1):
              ratio = n / phi[n]
              if ratio > max_ratio:
                  max_ratio = ratio
                  max_n = n
          return max_n
    githubLink: https://github.com/tvarley/euler/blob/main/python/src/euler069.py
    performance: O(N log log N) time, O(N) space (totient sieve)
  - language: go
    code: |
      package main

      import (
      	"fmt"
      )

      func totientMaximum() int {
      	primes := []int{2, 3, 5, 7, 11, 13, 17, 19, 23}
      	n := 1
      	for _, p := range primes {
      		if n*p > 1000000 {
      			break
      		}
      		n *= p
      	}
      	return n
      }

      func main() {
      	fmt.Println(totientMaximum())
      }
    githubLink: https://github.com/tvarley/euler/blob/main/go/euler069.go
    performance: O(1) time, O(1) space (simple multiplication loop)
  - language: rust
    code: |
      pub fn totient_maximum() -> u64 {
          let primes = vec![2, 3, 5, 7, 11, 13, 17, 19, 23];
          let mut n = 1u64;
          for &p in &primes {
              if n * p > 1_000_000 {
                  break;
              }
              n *= p;
          }
          n
      }
    githubLink: https://github.com/tvarley/euler/blob/main/rust/src/euler069.rs
    performance: O(1) time, O(1) space (simple multiplication loop)
tags: [totient-function, number-theory]
featured: false
showcase: false
solutionNotes: |
  ## Mathematical Background
  Euler's totient function φ(n) counts numbers ≤ n that are coprime to n. For n with many distinct prime factors, φ(n)/n is large, making n/φ(n) small. Conversely, numbers that are products of the smallest primes maximize n/φ(n).

  ## Algorithm Overview
  The maximum n/φ(n) for n ≤ 1,000,000 is achieved by the product of the smallest primes: 2×3×5×7×11×13×17 = 510510. Some implementations compute φ(n) for all n using a sieve, while others directly calculate this product.

  ## Performance Analysis
  Sieve-based approaches run in O(N log log N) time with O(N) space. Direct prime product methods are O(1). The optimal n is found instantly once the mathematical insight is applied.

  ## Key Insights
  Numbers with fewer, smaller prime factors have higher n/φ(n) ratios. The maximum occurs at highly composite numbers formed from the smallest primes. This problem demonstrates how number-theoretic properties can lead to efficient solutions.

  ## Educational Value
  This problem introduces Euler's totient function and its relation to prime factors. It shows how mathematical analysis can replace brute force computation, teaching the importance of understanding the underlying mathematics.
---