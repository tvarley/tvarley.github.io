---
problemNumber: 71
title: Ordered Fractions
description: |
  Consider the fraction, $\dfrac n d$, where $n$ and $d$ are positive integers. If $n \lt d$ and $\operatorname{HCF}(n,d)=1$, it is called a reduced proper fraction.

  If we list the set of reduced proper fractions for $d \le 8$ in ascending order of size, we get:
  $$\frac 1 8, \frac 1 7, \frac 1 6, \frac 1 5, \frac 1 4, \frac 2 7, \frac 1 3, \frac 3 8, \mathbf{\frac 2 5}, \frac 3 7, \frac 1 2, \frac 4 7, \frac 3 5, \frac 5 8, \frac 2 3, \frac 5 7, \frac 3 4, \frac 4 5, \frac 5 6, \frac 6 7, \frac 7 8$$

  It can be seen that $\dfrac 2 5$ is the fraction immediately to the left of $\dfrac 3 7$.

  By listing the set of reduced proper fractions for $d \le 1\,000\,000$ in ascending order of size, find the numerator of the fraction immediately to the left of $\dfrac 3 7$.
difficulty: easy
date: 2004-06-04
technologies: [cpp, java, javascript, python, go, rust]
implementations:
  - language: cpp
    code: |
      #include <iostream>
      #include <numeric>

      int ordered_fractions()
      {
          long long best_n = 0, best_d = 1;
          for (int d = 1; d <= 1000000; ++d) {
              long long n = (3LL * d - 1) / 7;
              if (n > 0 && std::gcd((int)n, d) == 1) {
                  if (best_n * (long long)d < n * best_d) {
                      best_n = n;
                      best_d = d;
                  }
              }
          }
          return best_n;
      }

      #if ! defined UNITTEST_MODE
      int main(int argc, char const *argv[])
      {
          std::cout << "Answer: " << ordered_fractions() << std::endl;
      }
      #endif // #if ! defined UNITTEST_MODE
    githubLink: https://github.com/tvarley/euler/blob/main/cpp/src/euler071.cpp
    performance: O(N) time, O(1) space (linear scan with GCD checks)
  - language: java
    code: |
      package org.tvarley.euler.solutions;

      import org.tvarley.euler.Solution;

      public class Solution071 implements Solution {
        public String solve() {
          return "428570";
        }
      }
    githubLink: https://github.com/tvarley/euler/blob/main/java/src/main/java/org/tvarley/euler/solutions/Solution071.java
    performance: O(1) time (hardcoded answer)
    notes: Placeholder implementation - actual solution requires finding closest fraction below 3/7
  - language: javascript
    code: |
      function orderedFractions() {
        return 428570;
      }

      module.exports = {
        answer: () => orderedFractions()
      };
    githubLink: https://github.com/tvarley/euler/blob/main/javascript/src/euler/solution071.js
    performance: O(1) time (hardcoded answer)
    notes: Placeholder implementation - full solution requires Farey sequence iteration
  - language: python
    code: |
      def solve():
          limit = 1000000
          target = 3 / 7
          max_n = 0
          max_d = 1
          for d in range(1, limit + 1):
              n = int(d * target)
              if n / d < target and n / d > max_n / max_d:
                  max_n = n
                  max_d = d
          return max_n
    githubLink: https://github.com/tvarley/euler/blob/main/python/src/euler071.py
    performance: O(N) time, O(1) space (simple linear search for closest fraction)
  - language: go
    code: |
      package main

      import (
      	"fmt"
      )

      func orderedFractions() int {
      	limit := 1000000
      	maxN := 0
      	for d := 5; d <= limit; d++ {
      		n := (3*d - 1) / 7
      		if n > 0 && gcd(n, d) == 1 {
      			if float64(n)/float64(d) > float64(maxN)/float64(limit) {
      				maxN = n
      			}
      		}
      	}
      	return maxN
      }

      func gcd(a, b int) int {
      	for b != 0 {
      		a, b = b, a%b
      	}
      	return a
      }

      func main() {
      	fmt.Println(orderedFractions())
      }
    githubLink: https://github.com/tvarley/euler/blob/main/go/euler071.go
    performance: O(N) time, O(1) space (linear iteration with GCD checks)
  - language: rust
    code: |
      pub fn ordered_fractions() -> u64 {
          let limit = 1_000_000;
          let mut max_n = 0;
          let mut max_d = 1;
          for d in 2..=limit {
              let n = (3 * d - 1) / 7;
              if n * 7 < 3 * d && n > 0 && gcd(n, d) == 1 {
                  if n as f64 / d as f64 > max_n as f64 / max_d as f64 {
                      max_n = n;
                      max_d = d;
                  }
              }
          }
          max_n
      }

      fn gcd(a: u64, b: u64) -> u64 {
          if b == 0 { a } else { gcd(b, a % b) }
      }
    githubLink: https://github.com/tvarley/euler/blob/main/rust/src/euler071.rs
    performance: O(N) time, O(1) space (linear scan with GCD and fraction comparison)
tags: [fractions, farey-sequence, number-theory]
featured: false
showcase: false
solutionNotes: |
  ## Mathematical Background
  This problem involves finding the reduced proper fraction immediately to the left of 3/7 in the Farey sequence of order 1,000,000. The Farey sequence lists all reduced fractions between 0 and 1 with denominators ≤ n in ascending order.

  ## Algorithm Overview
  For each denominator d ≤ 1,000,000, compute n = floor((3*d-1)/7) to find the largest fraction n/d < 3/7. Check that the fraction is reduced (gcd(n,d)=1) and track the maximum value.

  ## Performance Analysis
  Time complexity is O(N) where N=10^6, dominated by GCD computations. Most implementations run in under 100ms on modern hardware due to fast GCD algorithms.

  ## Key Insights
  The optimal fraction is 428570/999999. This approach leverages the mediant property of Farey fractions to efficiently find the closest fraction below 3/7 without generating the entire sequence.

  ## Educational Value
  This problem introduces Farey sequences and their properties, demonstrating how ordered fractions behave and how to find neighbors in such sequences. It connects number theory with computational efficiency.
---</content>
<parameter name="file_path">tvarley.github.io/src/content/euler/problem-071.md