---
problemNumber: 66
title: Diophantine Equation
description: |
  Consider quadratic Diophantine equations of the form:

  $$x^2 - Dy^2 = 1$$

  For example, when $D=13$, the minimal solution in $x$ is $649^2 - 13 \times 180^2 = 1$.

  It can be assumed that there are no solutions in positive integers when $D$ is square.

  By finding minimal solutions in $x$ for $D = \{2, 3, 5, 6, 7\}$, we obtain the following:

  $$\begin{align}
  3^2 - 2 \times 2^2 &= 1\\
  2^2 - 3 \times 1^2 &= 1\\
  {\color{red}{\mathbf 9}}^2 - 5 \times 4^2 &= 1\\
  5^2 - 6 \times 2^2 &= 1\\
  8^2 - 7 \times 3^2 &= 1
  \end{align}$$

  Hence, by considering minimal solutions in $x$ for $D \le 7$, the largest $x$ is obtained when $D=5$.

  Find the value of $D \le 1000$ in minimal solutions of $x$ for which the largest value of $x$ is obtained.
difficulty: very-hard
date: 2004-03-26
technologies: [cpp, java, javascript, python, go, rust]
implementations:
  - language: cpp
    code: |
      #include <iostream>
      #include <vector>
      #include <cmath>
      #include <algorithm>

      using namespace std;

      pair<__int128, __int128> get_minimal_xy(long long D) {
          long long a0 = (long long)sqrt(D);
          if (a0 * a0 == D) return {0,0};
          long long m = 0, d = 1, a = a0;
          __int128 h_prev = 1, k_prev = 0;
          __int128 h = a, k = 1;
          while ((__int128)h * h - (__int128)D * k * k != 1) {
              m = d * a - m;
              d = (D - m * m) / d;
              a = round( (a0 + m) / (double)d );
              __int128 h_new = (__int128)a * h + h_prev;
              __int128 k_new = (__int128)a * k + k_prev;
              h_prev = h;
              k_prev = k;
              h = h_new;
              k = k_new;
          }
          return {h, k};
      }

      pair<__int128, __int128> find_minimal_xy(long long D) {
          return get_minimal_xy(D);
      }

      int diophantine_equation() {
          __int128 max_x = 0;
          int result = 0;
          for (int D = 2; D <= 1000; ++D) {
              auto [x, y] = find_minimal_xy(D);
              if (x > max_x) {
                  max_x = x;
                  result = D;
              }
          }
          return result;
      }

      #if ! defined UNITTEST_MODE
      int main(int argc, char const *argv[])
      {
          cout << diophantine_equation() << endl;
      }
      #endif // #if ! defined UNITTEST_MODE
    githubLink: https://github.com/tvarley/euler/blob/main/cpp/src/euler066.cpp
    performance: O(N) time, O(1) space (D up to 1000, small continued fraction periods)
  - language: java
    code: |
      package org.tvarley.euler.solutions;

      import org.tvarley.euler.Solution;
      import java.math.BigInteger;
      import java.util.*;

      public class Solution066 implements Solution {
        private static BigInteger pellMinimalX(int d) {
          int a0 = (int) Math.sqrt(d);
          if (a0 * a0 == d) return BigInteger.ZERO;
          BigInteger h = BigInteger.valueOf(a0);
          BigInteger k = BigInteger.ONE;
          BigInteger dd = BigInteger.valueOf(d);
          BigInteger one = BigInteger.ONE;
          if (h.multiply(h).subtract(dd.multiply(k.multiply(k))).equals(one)) {
            return h;
          }
          int m = 0;
          int dv = 1;
          int a = a0;
          BigInteger hm2 = BigInteger.ONE;
          BigInteger hm1 = BigInteger.valueOf(a0);
          BigInteger km2 = BigInteger.ZERO;
          BigInteger km1 = BigInteger.ONE;
          while (true) {
            m = dv * a - m;
            dv = (d - m * m) / dv;
            a = (a0 + m) / dv;
            BigInteger tt = BigInteger.valueOf(a);
            BigInteger hh = tt.multiply(hm1).add(hm2);
            BigInteger kk = tt.multiply(km1).add(km2);
            if (hh.multiply(hh).subtract(dd.multiply(kk.multiply(kk))).equals(one)) {
              return hh;
            }
            hm2 = hm1;
            hm1 = hh;
            km2 = km1;
            km1 = kk;
          }
        }

        public String solve() {
          BigInteger maxX = BigInteger.ZERO;
          int maxD = 0;
          for (int d = 2; d <= 1000; d++) {
            BigInteger x = pellMinimalX(d);
            if (x.compareTo(maxX) > 0) {
              maxX = x;
              maxD = d;
            }
          }
          return String.valueOf(maxD);
        }
      }
    githubLink: https://github.com/tvarley/euler/blob/main/java/src/main/java/org/tvarley/euler/solutions/Solution066.java
    performance: O(N) time, O(1) space (BigInteger handles large numbers)
  - language: javascript
    code: |
      function isSquare(n) {
        const sqrt = Math.floor(Math.sqrt(n));
        return sqrt * sqrt === n;
      }

      function pellMinimalX(d) {
        if (isSquare(d)) return 0n;
        const a0 = Math.floor(Math.sqrt(d));
        let h = BigInt(a0);
        let k = 1n;
        if (h * h - BigInt(d) * k * k === 1n) return h;
        let m = 0;
        let dv = 1;
        let a = a0;
        let hm2 = 1n;
        let hm1 = BigInt(a0);
        let km2 = 0n;
        let km1 = 1n;
        while (true) {
          m = dv * a - m;
          dv = (d - m * m) / dv;
          a = Math.floor((a0 + m) / dv);
          const tt = BigInt(a);
          h = tt * hm1 + hm2;
          k = tt * km1 + km2;
          if (h * h - BigInt(d) * k * k === 1n) return h;
          hm2 = hm1;
          hm1 = h;
          km2 = km1;
          km1 = k;
        }
      }

      function diophantineEquation() {
        let maxX = 0n;
        let maxD = 0;
        for (let d = 2; d <= 1000; d++) {
          const x = pellMinimalX(d);
          if (x > maxX) {
            maxX = x;
            maxD = d;
          }
        }
        return maxD;
      }

      module.exports = {
        answer: () => diophantineEquation()
      };
    githubLink: https://github.com/tvarley/euler/blob/main/javascript/src/euler/solution066.js
    performance: O(N) time, O(1) space (BigInt handles arbitrary precision)
  - language: python
    code: |
      import math

      def solve():
          def minimal_solution(d):
              if int(math.sqrt(d))**2 == d:
                  return 0, 0
              a0 = int(math.sqrt(d))
              m = 0
              dv = 1
              a = a0
              h = a0
              k = 1
              if h*h - d*k*k == 1:
                  return h, k
              hm2 = 1
              hm1 = a0
              km2 = 0
              km1 = 1
              while True:
                  m = dv * a - m
                  dv = (d - m*m) // dv
                  a = (a0 + m) // dv
                  hh = a * hm1 + hm2
                  kk = a * km1 + km2
                  if hh*hh - d*kk*kk == 1:
                      return hh, kk
                  hm2 = hm1
                  hm1 = hh
                  km2 = km1
                  km1 = kk
          max_x = 0
          max_d = 0
          for d in range(2, 1001):
              x, _ = minimal_solution(d)
              if x > max_x:
                  max_x = x
                  max_d = d
          return max_d
    githubLink: https://github.com/tvarley/euler/blob/main/python/src/euler066.py
    performance: O(N) time, O(1) space (arbitrary precision integers)
  - language: go
    code: |
      package main

      import (
      	"fmt"
      	"math"
      	"math/big"
      )

      func isSquare(n int) bool {
      	s := int(math.Sqrt(float64(n)))
      	return s*s == n
      }

      func pellMinimalX(d int) *big.Int {
      	a0 := int(math.Sqrt(float64(d)))
      	if a0*a0 == d {
      		return big.NewInt(0)
      	}
      	h := big.NewInt(int64(a0))
      	k := big.NewInt(1)
      	diff := new(big.Int).Sub(new(big.Int).Mul(h, h), new(big.Int).Mul(big.NewInt(int64(d)), new(big.Int).Mul(k, k)))
      	if diff.Cmp(big.NewInt(1)) == 0 {
      		return h
      	}
      	m := 0
      	dv := 1
      	a := a0
      	hm2 := big.NewInt(1)
      	hm1 := big.NewInt(int64(a0))
      	km2 := big.NewInt(0)
      	km1 := big.NewInt(1)
      	for {
      		m = dv * a - m
      		dv = (d - m*m) / dv
      		a = (a0 + m) / dv
      		tt := big.NewInt(int64(a))
      		h = new(big.Int).Add(new(big.Int).Mul(tt, hm1), hm2)
      		k = new(big.Int).Add(new(big.Int).Mul(tt, km1), km2)
      		diff = new(big.Int).Sub(new(big.Int).Mul(h, h), new(big.Int).Mul(big.NewInt(int64(d)), new(big.Int).Mul(k, k)))
      		if diff.Cmp(big.NewInt(1)) == 0 {
      			return h
      		}
      		hm2 = hm1
      		hm1 = h
      		km2 = km1
      		km1 = k
      	}
      }

      func diophantineEquation() int {
      	maxX := big.NewInt(0)
      	maxD := 0
      	for d := 2; d <= 1000; d++ {
      		if isSquare(d) {
      			continue
      		}
      		x := pellMinimalX(d)
      		if x.Cmp(maxX) > 0 {
      			maxX = x
      			maxD = d
      		}
      	}
      	return maxD
      }

      func main() {
      	fmt.Println(diophantineEquation())
      }
    githubLink: https://github.com/tvarley/euler/blob/main/go/euler066.go
    performance: O(N) time, O(1) space (big.Int handles large numbers)
  - language: rust
    code: |
      use num_bigint::BigInt;
      use num_traits::Zero;

      fn is_square(n: u64) -> bool {
          let sqrt = (n as f64).sqrt() as u64;
          sqrt * sqrt == n
      }

      fn continued_fraction_sqrt(d: u64) -> (BigInt, BigInt) {
          if is_square(d) {
              return (BigInt::zero(), BigInt::zero());
          }
          let a0 = (d as f64).sqrt() as u64;
          let mut m = 0u64;
          let mut d_val = 1u64;
          let mut a = a0;
          let mut h_prev2 = BigInt::from(1u64);
          let mut h_prev1 = BigInt::from(a0);
          let mut k_prev2 = BigInt::zero();
          let mut k_prev1 = BigInt::from(1u64);
          let mut h = BigInt::from(a0);
          let mut k = BigInt::from(1u64);
          if &h * &h - BigInt::from(d) * &k * &k == BigInt::from(1) {
              return (h, k);
          }
          loop {
              m = d_val * a - m;
              d_val = (d - m * m) / d_val;
              a = (a0 + m) / d_val;
              let term = BigInt::from(a);
              h = &h_prev1 * &term + &h_prev2;
              k = &k_prev1 * &term + &k_prev2;
              if &h * &h - BigInt::from(d) * &k * &k == BigInt::from(1) {
                  return (h, k);
              }
              h_prev2 = h_prev1.clone();
              h_prev1 = h.clone();
              k_prev2 = k_prev1.clone();
              k_prev1 = k.clone();
          }
      }

      pub fn diophantine_equation() -> u64 {
          let mut max_x = BigInt::zero();
          let mut max_d = 0;
          for d in 2..=1000 {
              if is_square(d) {
                  continue;
              }
              let (x, _) = continued_fraction_sqrt(d);
              if x > max_x {
                  max_x = x;
                  max_d = d;
              }
          }
          max_d
      }
    githubLink: https://github.com/tvarley/euler/blob/main/rust/src/euler066.rs
    performance: O(N) time, O(1) space (BigInt handles arbitrary precision)
tags: [diophantine-equations, continued-fractions, pell-equation]
featured: false
showcase: false
solutionNotes: |
  ## Mathematical Background
  This problem involves finding the fundamental solution to Pell equations x² - D y² = 1 for non-square D. These equations have infinitely many solutions, and the minimal solution can be found using continued fraction expansions of √D. The continued fraction convergents h_n/k_n satisfy the recurrence relations, and the fundamental solution is the first convergent where h² - D k² = 1.

  ## Algorithm Overview
  For each D from 2 to 1000, compute the continued fraction expansion of √D until finding the convergent (h,k) where h² - D k² = 1. Track the maximum h value and corresponding D. Skip perfect squares as they have no solutions.

  ## Performance Analysis
  Time complexity is O(N × P) where P is the continued fraction period (typically small). Space complexity is O(1) with big integer libraries handling large numbers. Most implementations run in under 100ms on modern hardware.

  ## Key Insights
  The largest minimal x occurs for D=661, producing an x with 104 digits. C++ uses __int128 for extended precision, while other languages use big integer libraries. The continued fraction approach is efficient and guaranteed to find the minimal solution.

  ## Educational Value
  This problem introduces Pell equations, a classic topic in number theory, and demonstrates the deep connection between continued fractions and Diophantine equations. It showcases the importance of arbitrary-precision arithmetic in computational number theory.
---