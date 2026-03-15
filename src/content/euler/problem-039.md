---
problemNumber: 39
title: "Integer Right Triangles"
description: |
  If $p$ is the perimeter of a right angle triangle with integral length sides, $\{a, b, c\}$, there are exactly three solutions for $p = 120$.
  
  $\{20,48,52\}$, $\{24,45,51\}$, $\{30,40,50\}$
  
  For which value of $p \le 1000$, is the number of solutions maximised?
difficulty: "hard"
date: 2026-03-12
technologies: ["cpp", "java", "javascript", "python", "go", "rust"]
implementations:
  - language: "cpp"
    code: |
      #include <iostream>
      #include <vector>
      #include <string>
      
      int integer_right_triangles() {
          int max_count = 0;
          int best_p = 0;
          for(int p=12; p<=1000; p++) {
              int count = 0;
              for(int a=1; a<p; a++) {
                  for(int b=a; b<p-a; b++) {
                      int c = p - a - b;
                      if(a*a + b*b == c*c) count++;
                  }
              }
              if(count > max_count) {
                  max_count = count;
                  best_p = p;
              }
          }
          return best_p;
      }
      
      #if ! defined UNITTEST_MODE
      int main(int argc, char const *argv[]) {
          std::cout << integer_right_triangles() << std::endl;
      }
      #endif // UNITTEST_MODE
    githubLink: "https://github.com/tvarley/euler/blob/master/cpp/src/euler039.cpp"
    performance: "O(n) time complexity"
  - language: "java"
    code: |
      package org.tvarley.euler.solutions;
      
      import org.tvarley.euler.Solution;
      
      public class Solution039 implements Solution {
        public String solve() {
          int max = 0;
          int maxP = 0;
          for (int p = 1; p <= 1000; p++) {
            int count = 0;
            for (int a = 1; a < p; a++) {
              for (int b = a; b < p - a; b++) {
                int c = p - a - b;
                if (a * a + b * b == c * c) count++;
              }
            }
            if (count > max) {
              max = count;
              maxP = p;
            }
          }
          return Integer.toString(maxP);
        }
      }
    githubLink: "https://github.com/tvarley/euler/blob/master/java/src/main/java/org/tvarley/euler/solutions/Solution039.java"
  - language: "javascript"
    code: |
      module.exports = {
        answer: () => {
          let maxCount = 0, maxP = 0;
          for (let p = 1; p <= 1000; p++) {
            let count = 0;
            for (let a = 1; a < p; a++) {
              for (let b = a; b < p - a; b++) {
                const c = p - a - b;
                if (c < b) continue;
                if (a * a + b * b === c * c) count++;
              }
            }
            if (count > maxCount) {
              maxCount = count;
              maxP = p;
            }
          }
          return maxP;
        }
      };
    githubLink: "https://github.com/tvarley/euler/blob/master/javascript/src/euler/solution039.js"
  - language: "python"
    code: |
      def solve():
          """
          Integer Right Triangles
          If p is the perimeter of a right angle triangle with integral length sides, {a, b, c}, there are exactly three solutions for p = 120.
      
          {20,48,52}, {24,45,51}, {30,40,50}
      
          For which value of p ≤ 1000, is the number of solutions maximised?
          https://projecteuler.net/problem=39
          """
          max_solutions = 0
          max_p = 0
          for p in range(1, 1001):
              solutions = 0
              for a in range(1, p // 2):
                  for b in range(a, (p - a) // 2):
                      c = p - a - b
                      if a**2 + b**2 == c**2:
                          solutions += 1
              if solutions > max_solutions:
                  max_solutions = solutions
                  max_p = p
          return max_p
    githubLink: "https://github.com/tvarley/euler/blob/master/python/src/euler039.py"
  - language: "go"
    code: |
      package main
      
      import "fmt"
      
      func main() {
      	maxCount := 0
      	maxP := 0
      	for p := 1; p <= 1000; p++ {
      		count := 0
      		for a := 1; a < p; a++ {
      			for b := a; b < p-a; b++ {
      				c := p - a - b
      				if a*a + b*b == c*c {
      					count++
      				}
      			}
      		}
      		if count > maxCount {
      			maxCount = count
      			maxP = p
      		}
      	}
      	fmt.Println(maxP)
      }
    githubLink: "https://github.com/tvarley/euler/blob/master/go/euler039.go"
  - language: "rust"
    code: |
      // Answer: 840
      
      pub fn integer_right_triangles() -> u64 {
          let mut max_count = 0;
          let mut max_p = 0;
          for p in 1..=1000 {
              let mut count = 0;
              for a in 1..p / 2 {
                  for b in a..(p - a) / 2 {
                      let c = p - a - b;
                      if a * a + b * b == c * c {
                          count += 1;
                      }
                  }
              }
              if count > max_count {
                  max_count = count;
                  max_p = p;
              }
          }
          max_p
      }
      
      #[cfg(test)]
      mod tests {
          use super::*;
      
          #[test]
          fn euler_039() {
              assert_eq!(integer_right_triangles(), 840);
          }
      }
    githubLink: "https://github.com/tvarley/euler/blob/master/rust/src/euler039.rs"
tags: ["euler"]
featured: false
showcase: true
---

## Solution Notes

### Mathematical Background

A Pythagorean triple consists of integers a, b, c where a² + b² = c². Primitive triples can be generated by formulas involving coprime integers m > n > 0 with m-n odd.

For perimeter p = a + b + c, we count all triples where a < b < c and a + b + c = p.

### Algorithm Analysis

The implementations use brute force enumeration:

- Iterate over all perimeters p from 1 to 1000
- For each p, iterate over possible a and b values (a < b < c, c = p - a - b)
- Check if a² + b² = c²
- Count solutions per perimeter and track the maximum

Optimizations include a < b and b < c to avoid duplicates.

### Performance Analysis

- **Time Complexity**: O(P × P²) where P=1000, resulting in ~10^9 operations, but practical optimizations reduce this. Executes in seconds on modern hardware.
- **Space Complexity**: O(1) - no additional data structures needed.
- **Execution Time**: Fast (1-2 seconds), suitable for batch processing.
- **Scalability**: Quadratic in perimeter limit, acceptable for small bounds.

### Key Insights

- Perimeter 840 has the most solutions (8 Pythagorean triples)
- Larger perimeters generally have more solutions
- The distribution follows mathematical patterns in triple generation
- Brute force is feasible due to the small upper bound

### Educational Value

This problem teaches:
- Pythagorean triples and their properties
- Systematic enumeration with constraints
- The relationship between perimeter and triangle solutions
- Optimization techniques for nested loops
- Mathematical patterns in combinatorial counting
