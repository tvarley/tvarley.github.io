---
problemNumber: 9
title: "Special Pythagorean Triplet"
description: |
  A Pythagorean triplet is a set of three natural numbers, a < b < c, for which,

  $$a^2 + b^2 = c^2.$$

  For example, $3^2 + 4^2 = 9 + 16 = 25 = 5^2$.

  There exists exactly one Pythagorean triplet for which $a + b + c = 1000$.

  Find the product $abc$.
difficulty: "easy"
date: 2026-03-10
technologies: ["cpp", "java", "javascript", "python", "ruby", "go", "rust"]
implementations:
  - language: "cpp"
    code: |
      // https://projecteuler.net/problem=9
      // Answer: 31875000
      // a:200 b:375 c:425
      
      // Special Pythagorean triplet
      
      // Problem 9
      
      // A Pythagorean triplet is a set of three natural numbers, a < b < c,
      // for which,
      //
      // a^2 + b^2 = c^2
      //
      // For example, (3^2 + 4^2) = (9 + 16) = 25 = 5^2.
      //
      // There exists exactly one Pythagorean triplet for which a + b + c = 1000.
      // Find the product abc.
      
      #include <iostream>
      
      using namespace std;
      
      int special_pyg_brute()
      {
        for(int a = 500; --a; ){
          for(int b = 500; --b; ){
            int c = 1000 - b - a;
            if( a < b && (0==(a*a)+(b*b)-(c*c)) ){
              return a*b*c;
            }
          }
        }
        return 0;
      }
      
      const static int g_n = 1000;
      
      int special_pyg_opt()
      {
        // Take advantage of the actual maximum range
        // i.e. a can only have a maximum value of n/3 to
        // satisfy a < b < c && (a+b+c)==n
        for(int a = (g_n/3); --a; ){
          for(int b = (g_n/2); --b; ){
            int c = g_n - b - a;
            if( (a*a)+(b*b) == (c*c) ){
              return a*b*c;
            }
          }
        }
        return 0;
      }
      
      #if ! defined UNITTEST_MODE
      int main(int argc, char const *argv[])
      {
        std::cout << "Answer: " << special_pyg_brute() << std::endl;
        std::cout << "Answer: " << special_pyg_opt() << std::endl;
      }
      #endif
    githubLink: "https://github.com/tvarley/euler/blob/master/cpp/src/euler009.cpp"
    performance: "O(n) time complexity"
  - language: "java"
    code: |
      package org.tvarley.euler.solutions;
      
      import org.tvarley.euler.Solution;
      
      public class Solution009 implements Solution {
        public String solve() {
          for (int a = 1; a < 333; a++) {
            for (int b = a + 1; b < (1000 - a) / 2; b++) {
              int c = 1000 - a - b;
              if (a * a + b * b == c * c) {
                return Integer.toString(a * b * c);
              }
            }
          }
          return "0"; // Should not reach here
        }
      }
    githubLink: "https://github.com/tvarley/euler/blob/master/java/src/main/java/org/tvarley/euler/solutions/Solution009.java"
  - language: "javascript"
    code: |
      module.exports = {
        answer: () => {
          for (let a = 1; a < 1000; a++) {
            for (let b = a + 1; b < 1000 - a; b++) {
              let c = 1000 - a - b;
              if (a * a + b * b === c * c) {
                return a * b * c;
              }
            }
          }
        }
      };
    githubLink: "https://github.com/tvarley/euler/blob/master/javascript/src/euler/solution009.js"
  - language: "python"
    code: |
      def solve():
          """
          Special Pythagorean triplet
          A Pythagorean triplet is a set of three natural numbers, a < b < c, for which,
          a^2 + b^2 = c^2
          For example, 3^2 + 4^2 = 9 + 16 = 25 = 5^2.
          There exists exactly one Pythagorean triplet for which a + b + c = 1000.
          Find the product abc.
          """
          for a in range(1, 1000):
              for b in range(a + 1, 1000 - a):
                  c = 1000 - a - b
                  if a * a + b * b == c * c:
                      return a * b * c
    githubLink: "https://github.com/tvarley/euler/blob/master/python/src/euler009.py"
  - language: "ruby"
    code: |
      def pyg(limit)
        # We can limit the range of a and b because of the following requirements:
        # a < b < c
        # a + b + c = 1000
        (1..limit / 3).each do |a|
          (a..limit / 2).each do |b|
            c = 1000 - b - a
            return (a * b * c) if (a * a) + (b * b) == (c * c)
          end
        end
      end
      
      puts pyg(1000) if __FILE__ == $PROGRAM_NAME
    githubLink: "https://github.com/tvarley/euler/blob/master/ruby/lib/euler009.rb"
  - language: "go"
    code: |
      package main
      
      import "fmt"
      
      func main() {
      
          for a := 1; a < 333; a++ {
      
              for b := a + 1; b < (1000-a)/2; b++ {
      
                  c := 1000 - a - b
      
                  if a*a + b*b == c*c {
      
                      fmt.Println(a * b * c)
      
                      return
      
                  }
      
              }
      
          }
      
      }
    githubLink: "https://github.com/tvarley/euler/blob/master/go/euler009.go"
  - language: "rust"
    code: |
      // https://projecteuler.net/problem=9
      //
      // A Pythagorean triplet is a set of three natural numbers, a < b < c, for which,
      // a² + b² = c²
      //
      // For example, 3² + 4² = 9 + 16 = 25 = 5².
      //
      // There exists exactly one Pythagorean triplet for which a + b + c = 1000.
      // Find the product abc.
      //
      // Answer: 31875000
      
      pub fn special_pythagorean_triplet(sum: u64) -> u64 {
          for a in 1..sum/3 {
              for b in a+1..(sum-a)/2 {
                  let c = sum - a - b;
                  if a*a + b*b == c*c {
                      return a * b * c;
                  }
              }
          }
          0
      }
      
      #[cfg(test)]
      mod tests {
          use super::*;
      
          #[test]
          fn euler_009() {
              assert_eq!(special_pythagorean_triplet(1000), 31_875_000);
          }
      }
    githubLink: "https://github.com/tvarley/euler/blob/master/rust/src/euler009.rs"
tags: ["euler"]
featured: false
showcase: true
---

## Solution Notes

### Mathematical Background

A Pythagorean triplet consists of three positive integers (a, b, c) satisfying a² + b² = c². Primitive triplets can be generated using formulas derived from the identity:

- For any pair of integers m > n > 0 with m and n coprime and not both odd: a = m² - n², b = 2mn, c = m² + n²
- All triplets are multiples of primitive triplets

For triplets summing to a specific value S = a + b + c, we have the relation c = S - a - b, so the Pythagorean equation becomes: a² + b² = (S - a - b)², which expands to 2ab - 2Sa + 2Sb = S² - 2S² + S² wait, let me recalculate properly.

Actually: a² + b² = (S - a - b)² = S² - 2S(a+b) + (a+b)²

This leads to the equation: a² + b² - (a+b)² = S² - 2S(a+b)

Which simplifies to: -2ab = S² - 2S(a+b)

Or: 2ab = 2S(a+b) - S²

ab = S(a+b) - S²/2

### Algorithm Analysis

The implementations use brute force enumeration with constraints:

**Nested loops**: Try all possible a, b values with constraints a < b < c and a + b + c = 1000

**Range optimization**: Since a < b < c and a + b + c = 1000, we have:
- a < 1000/3 ≈ 333
- b < 1000/2 = 500
- c = 1000 - a - b > b (so b < 500)

**Early termination**: Some implementations use a < b < c constraints to reduce iterations

Time complexity is O(n²) where n ≈ 333, making it very efficient even for brute force.

### Key Insights

- The constraints a < b < c and a + b + c = 1000 significantly reduce the search space
- Expressing c = 1000 - a - b eliminates one variable
- The triplet (200, 375, 425) is the unique solution for sum = 1000
- All primitive triplets can be generated systematically using the m,n formula
- This problem demonstrates how mathematical constraints can make brute force practical
- The solution involves a multiple of the (3,4,5) primitive triplet scaled by 200/3 ≈ 66.67

### Educational Value

This problem teaches fundamental concepts in:
- Number theory and Pythagorean triples
- Constraint-based problem solving
- The relationship between brute force and mathematical optimization
- Understanding search space reduction through problem constraints
- How mathematical formulas can generate all solutions systematically
- The importance of primitive vs. non-primitive number relationships
