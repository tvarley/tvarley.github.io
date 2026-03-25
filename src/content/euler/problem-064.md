---
problemNumber: 64
title: Odd Period Square Roots
description: |
  All square roots are periodic when written as continued fractions and can be written in the form:

  $$\sqrt{N}=a_0 + \dfrac 1 {a_1 + \dfrac 1 {a_2 + \dfrac 1 {a_3 + \dots}}}$$

  For example, let us consider $\sqrt{23}:$

  $$\sqrt{23} = 4 + \sqrt{23}-4=4 + \dfrac 1 {\dfrac 1 {\sqrt{23}-4}} = 4+\dfrac 1  {1 + \dfrac{\sqrt{23}-3}7}$$

  If we continue we would get the following expansion:

  $$\sqrt{23}=4 + \dfrac 1 {1 + \dfrac 1 {3+ \dfrac 1 {1 + \dfrac 1 {8+ \dots}}}}$$

  The process can be summarised as follows:

  $$\begin{align} \quad \quad a_0 &= 4, \frac 1 {\sqrt{23}-4}=\frac {\sqrt{23}+4} 7=1+\frac {\sqrt{23}-3} 7 \\ \quad \quad a_1 &= 1, \frac 7 {\sqrt{23}-3}=\frac {7(\sqrt{23}+3)} {14}=3+\frac {\sqrt{23}-3} 2 \\ \quad \quad a_2 &= 3, \frac 2 {\sqrt{23}-3}=\frac {2(\sqrt{23}+3)} {14}=1+\frac {\sqrt{23}-4} 7 \\ \quad \quad a_3 &= 1, \frac 7 {\sqrt{23}-4}=\frac {7(\sqrt{23}+4)} 7=8+\sqrt{23}-4 \\ \quad \quad a_4 &= 8, \frac 1 {\sqrt{23}-4}=\frac {\sqrt{23}+4} 7=1+\frac {\sqrt{23}-3} 7 \\ \quad \quad a_5 &= 1, \frac 7 {\sqrt{23}-3}=\frac {7 (\sqrt{23}+3)} {14}=3+\frac {\sqrt{23}-3} 2 \\ \quad \quad a_6 &= 3, \frac 2 {\sqrt{23}-3}=\frac {2(\sqrt{23}+3)} {14}=1+\frac {\sqrt{23}-4} 7 \\ \quad \quad a_7 &= 1, \frac 7 {\sqrt{23}-4}=\frac {7(\sqrt{23}+4)} {7}=8+\sqrt{23}-4 \end{align}$$

  It can be seen that the sequence is repeating. For conciseness, we use the notation $\sqrt{23}=[4;(1,3,1,8)]$, to indicate that the block (1,3,1,8) repeats indefinitely.

  The first ten continued fraction representations of (irrational) square roots are:

  $\quad \quad \sqrt{2}=[1;(2)]$, period=$1$  
  $\quad \quad \sqrt{3}=[1;(1,2)]$, period=$2$  
  $\quad \quad \sqrt{5}=[2;(4)]$, period=$1$  
  $\quad \quad \sqrt{6}=[2;(2,4)]$, period=$2$  
  $\quad \quad \sqrt{7}=[2;(1,1,1,4)]$, period=$4$  
  $\quad \quad \sqrt{8}=[2;(1,4)]$, period=$2$  
  $\quad \quad \sqrt{10}=[3;(6)]$, period=$1$  
  $\quad \quad \sqrt{11}=[3;(3,6)]$, period=$2$  
  $\quad \quad \sqrt{12}=[3;(2,6)]$, period=$2$  
  $\quad \quad \sqrt{13}=[3;(1,1,1,1,6)]$, period=$5$

  Exactly four continued fractions, for $N \le 13$, have an odd period.

  How many continued fractions for $N \le 10\,000$ have an odd period?
difficulty: hard
date: 2004-02-27
technologies: [cpp, java, javascript, python, go, rust]
implementations:
  - language: cpp
    code: |
      #include <iostream>
      #include <vector>
      #include <cmath>
      #include <map>
      #include <tuple>

      int odd_period_square_roots() {
          int count = 0;
          for (long long N = 2; N <= 10000; ++N) {
              long long sqrtN = (long long)std::sqrt(N);
              if (sqrtN * sqrtN == N) continue;
              long long m = 0;
              long long d = 1;
              long long a = sqrtN;
              long long period = 0;
              long long a0 = sqrtN;
              long long an = sqrtN;
              while (an != 2 * a0) {
                  m = d * an - m;
                  d = (N - m * m) / d;
                  an = (a0 + m) / d;
                  period++;
              }
              if (period % 2 == 1) ++count;
          }
          return count;
      }

      #if ! defined UNITTEST_MODE
      int main(int argc, char const *argv[]) {
          std::cout << odd_period_square_roots() << std::endl;
      }
      #endif // UNITTEST_MODE
    githubLink: https://github.com/tvarley/euler/blob/main/cpp/src/euler064.cpp
    performance: O(N) time, O(1) space
  - language: java
    code: |
      package org.tvarley.euler.solutions;

      import org.tvarley.euler.Solution;
      import java.util.*;

      public class Solution064 implements Solution {
        public String solve() {
          int count = 0;
          for (int N = 2; N <= 10000; N++) {
            int sqrtN = (int) Math.sqrt(N);
            if (sqrtN * sqrtN == N) continue;
            int period = 0;
            int a = sqrtN;
            int m = 0;
            int d = 1;
            Map<String, Boolean> seen = new HashMap<>();
            for (;;) {
              int nextM = d * a - m;
              int nextD = (N - nextM * nextM) / d;
              int nextA = (sqrtN + nextM) / nextD;
              period++;
              String key = nextM + "," + nextD + "," + nextA;
              if (seen.containsKey(key)) break;
              seen.put(key, true);
              m = nextM;
              d = nextD;
              a = nextA;
            }
            if ((period - 1) % 2 == 1) count++;
          }
          return String.valueOf(count);
        }
      }
    githubLink: https://github.com/tvarley/euler/blob/main/java/src/main/java/org/tvarley/euler/solutions/Solution064.java
    performance: O(N) time, O(N) space (due to HashMap)
  - language: javascript
    code: |
      function oddPeriodSquareRoots() {
        let count = 0;
        for (let N = 2; N <= 10000; N++) {
          const sqrtN = Math.floor(Math.sqrt(N));
          if (sqrtN * sqrtN === N) continue;
          let period = 0;
          let a = sqrtN;
          let m = 0;
          let d = 1;
          const seen = new Set();
          for (;;) {
            const nextM = d * a - m;
            const nextD = (N - nextM * nextM) / d;
            const nextA = Math.floor((sqrtN + nextM) / nextD);
            period++;
            const key = `${nextM},${nextD},${nextA}`;
            if (seen.has(key)) break;
            seen.add(key);
            m = nextM;
            d = nextD;
            a = nextA;
          }
          if ((period - 1) % 2 === 1) count++;
        }
        return count;
      }

      module.exports = {
        answer: () => oddPeriodSquareRoots()
      };
    githubLink: https://github.com/tvarley/euler/blob/main/javascript/src/euler/solution064.js
    performance: O(N) time, O(N) space (due to Set)
  - language: python
    code: |
      import math

      def solve():
          count = 0
          for N in range(2, 10001):
              sqrtN = int(math.sqrt(N))
              if sqrtN * sqrtN == N:
                  continue
              period = 0
              a = sqrtN
              m = 0
              d = 1
              seen = set()
              while True:
                  next_m = d * a - m
                  next_d = (N - next_m * next_m) // d
                  next_a = (sqrtN + next_m) // next_d
                  period += 1
                  state = (next_m, next_d, next_a)
                  if state in seen:
                      break
                  seen.add(state)
                  m, d, a = next_m, next_d, next_a
              if (period - 1) % 2 == 1:
                  count += 1
          return count
    githubLink: https://github.com/tvarley/euler/blob/main/python/src/euler064.py
    performance: O(N) time, O(N) space (due to set)
  - language: go
    code: |
      package main

      import (
      	"fmt"
      	"math"
      )

      func oddPeriodSquareRoots() int {
      	count := 0
      	for N := 2; N <= 10000; N++ {
      		sqrtN := int(math.Sqrt(float64(N)))
      		if sqrtN*sqrtN == N {
      			continue // perfect square
      		}
      		period := 0
      		a := sqrtN
      		m := 0
      		d := 1
      		seen := make(map[string]bool)
      		for {
      			nextM := d*a - m
      			nextD := (N - nextM*nextM) / d
      			nextA := (sqrtN + nextM) / nextD
      			period++
      			key := fmt.Sprintf("%d,%d,%d", nextM, nextD, nextA)
      			if seen[key] {
      				break
      			}
      			seen[key] = true
      			m = nextM
      			d = nextD
      			a = nextA
      		}
      		if (period-1)%2 == 1 {
      			count++
      		}
      	}
      	return count
      }

      func main() {
      	fmt.Println(oddPeriodSquareRoots())
      }
    githubLink: https://github.com/tvarley/euler/blob/main/go/euler064.go
    performance: O(N) time, O(N) space (due to map)
  - language: rust
    code: |
      use std::collections::HashSet;

      pub fn odd_period_square_roots() -> u32 {
          let mut count = 0;
          for n in 2..=10000 {
              let sqrt_n = (n as f64).sqrt() as i64;
              if sqrt_n * sqrt_n == n as i64 {
                  continue;
              }
              let mut period = 0;
              let mut a = sqrt_n;
              let mut m = 0i64;
              let mut d = 1i64;
              let mut seen = HashSet::new();
              loop {
                  let next_m = d * a - m;
                  let next_d = (n as i64 - next_m * next_m) / d;
                  let next_a = (sqrt_n + next_m) / next_d;
                  period += 1;
                  let state = (next_m, next_d, next_a);
                  if seen.contains(&state) {
                      break;
                  }
                  seen.insert(state);
                  m = next_m;
                  d = next_d;
                  a = next_a;
              }
              if (period - 1) % 2 == 1 {
                  count += 1;
              }
          }
          count
      }
    githubLink: https://github.com/tvarley/euler/blob/main/rust/src/euler064.rs
    performance: O(N) time, O(N) space (due to HashSet)
tags: [continued-fractions, number-theory]
featured: false
showcase: false
solutionNotes: |
  ## Mathematical Background
  This problem involves continued fraction expansions of square roots. Every irrational square root √N can be expressed as a periodic continued fraction, where the sequence of partial quotients eventually repeats. The period length is the number of terms in the repeating block after the initial term.

  ## Algorithm Overview
  The solution implements the standard algorithm for computing the continued fraction expansion of √N. For each N from 2 to 10000 (skipping perfect squares), it calculates the period by simulating the continued fraction process and detecting when the state (m, d, a) repeats. The period is odd if (period - 1) % 2 == 1.

  ## Performance Analysis
  Time complexity is O(N × P) where P is the average period length (typically small, under 20 for N ≤ 10000). Space complexity is O(P) due to the set/map storing seen states. The algorithm runs efficiently within milliseconds on modern hardware.

  ## Key Insights
  The continued fraction period determines whether the expansion has an odd length. Different implementations use various data structures (HashMap, Set, map) to detect cycles, but all achieve the same result. The C++ version uses a different termination condition but produces the correct count.

  ## Educational Value
  This problem teaches about continued fractions, a powerful tool in number theory for approximating irrationals. It demonstrates cycle detection algorithms and highlights how mathematical periodicity can be computed programmatically.
---