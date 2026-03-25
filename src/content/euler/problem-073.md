---
problemNumber: 73
title: Counting Fractions in a Range
description: |
  Consider the fraction, $\dfrac n d$, where $n$ and $d$ are positive integers. If $n \lt d$ and $\operatorname{HCF}(n, d)=1$, it is called a reduced proper fraction.

  If we list the set of reduced proper fractions for $d \le 8$ in ascending order of size, we get:
  $$\frac 1 8, \frac 1 7, \frac 1 6, \frac 1 5, \frac 1 4, \frac 2 7, \frac 1 3, \mathbf{\frac 3 8, \frac 2 5, \frac 3 7}, \frac 1 2, \frac 4 7, \frac 3 5, \frac 5 8, \frac 2 3, \frac 5 7, \frac 3 4, \frac 4 5, \frac 5 6, \frac 6 7, \frac 7 8$$

  It can be seen that there are $3$ fractions between $\dfrac 1 3$ and $\dfrac 1 2$.

  How many fractions lie between $\dfrac 1 3$ and $\dfrac 1 2$ in the sorted set of reduced proper fractions for $d \le 12\,000$?
difficulty: hard
date: 2004-07-02
technologies: [cpp, java, javascript, python, go, rust]
implementations:
  - language: cpp
    code: |
      #include <iostream>
      #include <numeric>

      int counting_fractions_range()
      {
          int count = 0;
          for(int d=1; d<=12000; d++){
              int n_min = d / 3 + 1;
              int n_max = (d - 1) / 2;
              for(int n=n_min; n<=n_max; n++){
                  if(std::gcd(n, d) == 1){
                      count++;
                  }
              }
          }
          return count;
      }

      #if ! defined UNITTEST_MODE
      int main(int argc, char const *argv[])
      {
          std::cout << "Answer: " << counting_fractions_range() << std::endl;
      }
      #endif // #if ! defined UNITTEST_MODE
    githubLink: https://github.com/tvarley/euler/blob/main/cpp/src/euler073.cpp
    performance: O(N^2) time, O(1) space (brute force with GCD checks)
  - language: java
    code: |
      package org.tvarley.euler.solutions;

      import org.tvarley.euler.Solution;

      public class Solution073 implements Solution {
        public String solve() {
          return "7295372";
        }
      }
    githubLink: https://github.com/tvarley/euler/blob/main/java/src/main/java/org/tvarley/euler/solutions/Solution073.java
    performance: O(1) time (hardcoded answer)
    notes: Placeholder implementation - actual solution requires range counting of reduced fractions
  - language: javascript
    code: |
      function countingFractionsRange() {
        return 7295372;
      }

      module.exports = {
        answer: () => countingFractionsRange()
      };
    githubLink: https://github.com/tvarley/euler/blob/main/javascript/src/euler/solution073.js
    performance: O(1) time (hardcoded answer)
    notes: Placeholder implementation - full solution requires Farey sequence range counting
  - language: python
    code: |
      from math import gcd

      def solve():
          count = 0
          for d in range(1, 12001):
              n_min = d // 3 + 1
              n_max = (d - 1) // 2
              for n in range(n_min, n_max + 1):
                  if gcd(n, d) == 1:
                      count += 1
          return count
    githubLink: https://github.com/tvarley/euler/blob/main/python/src/euler073.py
    performance: O(N^2) time, O(1) space (nested loops with GCD checks)
  - language: go
    code: |
      package main

      import (
      	"fmt"
      )

      func countingFractionsRange() int {
      	count := 0
      	for d := 1; d <= 12000; d++ {
      		nMin := d/3 + 1
      		nMax := (d - 1) / 2
      		for n := nMin; n <= nMax; n++ {
      			if gcd(n, d) == 1 {
      				count++
      			}
      		}
      	}
      	return count
      }

      func gcd(a, b int) int {
      	for b != 0 {
      		a, b = b, a%b
      	}
      	return a
      }

      func main() {
      	fmt.Println(countingFractionsRange())
      }
    githubLink: https://github.com/tvarley/euler/blob/main/go/euler073.go
    performance: O(N^2) time, O(1) space (brute force enumeration with GCD)
  - language: rust
    code: |
      pub fn counting_fractions_range() -> u64 {
          let mut count = 0u64;
          for d in 1..=12000 {
              let n_min = d / 3 + 1;
              let n_max = (d - 1) / 2;
              for n in n_min..=n_max {
                  if gcd(n, d) == 1 {
                      count += 1;
                  }
              }
          }
          count
      }

      fn gcd(a: u64, b: u64) -> u64 {
          if b == 0 { a } else { gcd(b, a % b) }
      }
    githubLink: https://github.com/tvarley/euler/blob/main/rust/src/euler073.rs
    performance: O(N^2) time, O(1) space (nested iteration with GCD checks)
tags: [fractions, farey-sequence, number-theory]
featured: false
showcase: false
solutionNotes: |
  ## Mathematical Background
  This problem counts reduced proper fractions in the Farey sequence of order 12,000 that lie between 1/3 and 1/2. For each denominator d, count fractions n/d where d/3 < n/d < d/2 and gcd(n,d)=1.

  ## Algorithm Overview
  For each d from 1 to 12,000, iterate n from floor(d/3)+1 to floor((d-1)/2), checking if gcd(n,d)=1. Sum all valid fractions.

  ## Performance Analysis
  Time complexity is O(N^2) due to nested loops. For N=12,000, this runs in under 5 seconds on modern hardware with efficient GCD implementations.

  ## Key Insights
  The count is 7,295,372. The range 1/3 to 1/2 contains approximately 1/6 of all reduced fractions, but the exact count requires checking coprimality.

  ## Educational Value
  This problem demonstrates Farey sequences and their connection to counting problems. It shows how number theory concepts apply to computational challenges.
---</content>
<parameter name="file_path">tvarley.github.io/src/content/euler/problem-073.md