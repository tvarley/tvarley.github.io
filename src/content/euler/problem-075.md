---
problemNumber: 75
title: Singular Integer Right Triangles
description: |
  It turns out that **12 cm** is the smallest length of wire that can be bent to form an integer sided right angle triangle in exactly one way, but there are many more examples.

  - **12 cm**: $(3,4,5)$
  - **24 cm**: $(6,8,10)$
  - **30 cm**: $(5,12,13)$
  - **36 cm**: $(9,12,15)$
  - **40 cm**: $(8,15,17)$
  - **48 cm**: $(12,16,20)$

  In contrast, some lengths of wire, like **20 cm**, cannot be bent to form an integer sided right angle triangle, and other lengths allow more than one solution to be found; for example, using **120 cm** it is possible to form exactly three different integer sided right angle triangles.

  - **120 cm**: $(30,40,50)$, $(20,48,52)$, $(24,45,51)$

  Given that $L$ is the length of the wire, for how many values of $L \le 1\,500\,000$ can exactly one integer sided right angle triangle be formed?
difficulty: hard
date: 2004-07-30
technologies: [cpp, java, javascript, python, go, rust]
implementations:
  - language: cpp
    code: |
      #include <iostream>
      #include <vector>
      #include <numeric>

      int singular_integer_right_triangles()
      {
          const int MAXL = 1500000;
          std::vector<int> count(MAXL+1, 0);

          for(int m=2; ; m++){
              bool stop = false;
              for(int n=1; n<m; n++){
                  if((m-n) % 2 == 1 && std::gcd(m, n) == 1){
                      long long a = (long long)m*m - n*n;
                      long long b = 2LL * m * n;
                      long long c = (long long)m*m + n*n;
                      long long L = a + b + c;
                      for(long long k=1; ; k++){
                          long long LL = k * L;
                          if(LL > MAXL){
                              break;
                          }
                          count[LL]++;
                      }
                  }
              }
              if((long long)m*m + (m-1)*(m-1) > MAXL) break;
          }

          int ans = 0;
          for(int i=0; i<=MAXL; i++){
              if(count[i] == 1) ans++;
          }
          return ans;
      }

      #if ! defined UNITTEST_MODE
      int main(int argc, char const *argv[])
      {
          std::cout << "Answer: " << singular_integer_right_triangles() << std::endl;
      }
      #endif // #if ! defined UNITTEST_MODE
    githubLink: https://github.com/tvarley/euler/blob/main/cpp/src/euler075.cpp
    performance: O(N log N) time, O(N) space (Pythagorean triple generation with counting)
  - language: java
    code: |
      package org.tvarley.euler.solutions;

      import org.tvarley.euler.Solution;

      public class Solution075 implements Solution {
        public String solve() {
          return "161667";
        }
      }
    githubLink: https://github.com/tvarley/euler/blob/main/java/src/main/java/org/tvarley/euler/solutions/Solution075.java
    performance: O(1) time (hardcoded answer)
    notes: Implementation placeholder - actual solution requires Pythagorean triple enumeration
  - language: javascript
    code: |
      function singularIntegerRightTriangles() {
        return 161667;
      }

      module.exports = {
        answer: () => singularIntegerRightTriangles()
      };
    githubLink: https://github.com/tvarley/euler/blob/main/javascript/src/euler/solution075.js
    performance: O(1) time (hardcoded answer)
    notes: Placeholder implementation - full solution requires generating primitive Pythagorean triples
  - language: python
    code: |
      from math import gcd

      def solve():
          MAXL = 1500000
          count = [0] * (MAXL + 1)

          m = 2
          while True:
              for n in range(1, m):
                  if (m - n) % 2 == 1 and gcd(m, n) == 1:
                      a = m*m - n*n
                      b = 2*m*n
                      c = m*m + n*n
                      L = a + b + c
                      k = 1
                      while k * L <= MAXL:
                          count[k * L] += 1
                          k += 1
              if m*m + (m-1)*(m-1) > MAXL:
                  break
              m += 1

          return sum(1 for x in count if x == 1)
    githubLink: https://github.com/tvarley/euler/blob/main/python/src/euler075.py
    performance: O(N log N) time, O(N) space (primitive triple generation with multiples)
  - language: go
    code: |
      package main

      import (
      	"fmt"
      )

      func singularIntegerRightTriangles() int {
      	const MAXL = 1500000
      	count := make([]int, MAXL+1)

      	for m := 2; ; m++ {
      		for n := 1; n < m; n++ {
      			if (m-n)%2 == 1 && gcd(m, n) == 1 {
      				a := m*m - n*n
      				b := 2 * m * n
      				c := m*m + n*n
      				L := a + b + c
      				for k := 1; ; k++ {
      					LL := k * L
      					if LL > MAXL {
      						break
      					}
      					count[LL]++
      				}
      			}
      		}
      		if m*m+(m-1)*(m-1) > MAXL {
      			break
      		}
      	}

      	ans := 0
      	for i := 0; i <= MAXL; i++ {
      		if count[i] == 1 {
      			ans++
      		}
      	}
      	return ans
      }

      func gcd(a, b int) int {
      	for b != 0 {
      		a, b = b, a%b
      	}
      	return a
      }

      func main() {
      	fmt.Println(singularIntegerRightTriangles())
      }
    githubLink: https://github.com/tvarley/euler/blob/main/go/euler075.go
    performance: O(N log N) time, O(N) space (primitive triples with scaling)
  - language: rust
    code: |
      pub fn singular_integer_right_triangles() -> u64 {
          const MAXL: usize = 1_500_000;
          let mut count = vec![0u32; MAXL + 1];

          let mut m = 2;
          loop {
              for n in 1..m {
                  if (m - n) % 2 == 1 && gcd(m as u64, n as u64) == 1 {
                      let a = (m * m - n * n) as u64;
                      let b = (2 * m * n) as u64;
                      let c = (m * m + n * n) as u64;
                      let L = a + b + c;
                      let mut k = 1u64;
                      while let Some(LL) = k.checked_mul(L) {
                          if LL > MAXL as u64 {
                              break;
                          }
                          count[LL as usize] += 1;
                          k += 1;
                      }
                  }
              }
              if (m * m + (m - 1) * (m - 1)) as u64 > MAXL as u64 {
                  break;
              }
              m += 1;
          }

          let mut ans = 0;
          for &c in count.iter() {
              if c == 1 {
                  ans += 1;
              }
          }
          ans
      }

      fn gcd(a: u64, b: u64) -> u64 {
          if b == 0 { a } else { gcd(b, a % b) }
      }
    githubLink: https://github.com/tvarley/euler/blob/main/rust/src/euler075.rs
    performance: O(N log N) time, O(N) space (efficient triple generation with overflow checking)
tags: [pythagorean-triples, right-triangles, number-theory]
featured: false
showcase: false
solutionNotes: |
  ## Mathematical Background
  This problem involves counting wire lengths L ≤ 1,500,000 that can form exactly one integer-sided right triangle. Triangles are generated using primitive Pythagorean triples (a,b,c) where a² + b² = c², and multiples k×(a,b,c) give scaled triangles.

  ## Algorithm Overview
  Generate all primitive triples using Euclid's formula with coprime m>n>0, m-n odd, then scale by k to get all triangles with L ≤ 1,500,000. Count how many L values have exactly one triangle.

  ## Performance Analysis
  Time complexity is O(N log N) due to triple generation and scaling. Space complexity is O(N) for the count array. Most implementations run in under 10 seconds on modern hardware.

  ## Key Insights
  There are 161,667 such L values. The approach efficiently generates all triples without duplicates by ensuring primitive triples and proper scaling.

  ## Educational Value
  This problem demonstrates Pythagorean triple generation and the connection between number theory and geometry. It shows how mathematical formulas can efficiently solve enumeration problems.
---</content>
<parameter name="file_path">tvarley.github.io/src/content/euler/problem-075.md