---
problemNumber: 9
title: "Special Pythagorean Triplet"
description: "A Pythagorean triplet is a set of three natural numbers, a < b < c, for which, a^2 + b^2 = c^2 For example, 3^2 + 4^2 = 9 + 16 = 25 = 5^2. There exists exactly one Pythagorean triplet for which a + b + c = 1000. Find the product abc. Answer: 31875000"
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

## Additional Notes

This is Project Euler problem 9: Special Pythagorean Triplet.

A Pythagorean triplet is a set of three natural numbers, a < b < c, for which, a^2 + b^2 = c^2 For example, 3^2 + 4^2 = 9 + 16 = 25 = 5^2. There exists exactly one Pythagorean triplet for which a + b + c = 1000. Find the product abc. Answer: 31875000
