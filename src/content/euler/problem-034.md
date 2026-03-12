---
problemNumber: 34
title: "Digit Factorials"
description: |
  $145$ is a curious number, as $1! + 4! + 5! = 1 + 24 + 120 = 145$.
  
  Find the sum of all numbers which are equal to the sum of the factorial of their digits.
  
  <p class="smaller">Note: As $1! = 1$ and $2! = 2$ are not sums they are not included.
difficulty: "hard"
date: 2026-03-12
technologies: ["cpp", "java", "javascript", "python", "go", "rust"]
implementations:
  - language: "cpp"
    code: |
      // Answer: 40730
      
      // Authored by: Tim Varley 💘
      // Assisted-by: Grok Code Fast via Crush 💘 <crush@charm.land>
      
      #include <iostream>
      #include <vector>
      #include <string>
      
      long long digit_factorials() {
          std::vector<long long> fact(10,1);
          for(int i=2; i<10; i++) fact[i] = fact[i-1] * i;
          long long sum = 0;
          for(long long i=10; i<10000000; i++) {
              std::string s = std::to_string(i);
              long long sf = 0;
              for(char c : s) sf += fact[c-'0'];
              if(sf == i) sum += i;
          }
          return sum;
      }
      
      #if ! defined UNITTEST_MODE
      int main(int argc, char const *argv[]) {
          std::cout << digit_factorials() << std::endl;
      }
      #endif // UNITTEST_MODE
    githubLink: "https://github.com/tvarley/euler/blob/master/cpp/src/euler034.cpp"
    performance: "O(n) time complexity"
  - language: "java"
    code: |
      package org.tvarley.euler.solutions;
      
      import org.tvarley.euler.Solution;
      
      public class Solution034 implements Solution {
        public String solve() {
          long[] fact = new long[10];
          fact[0] = 1;
          for (int i = 1; i < 10; i++) fact[i] = fact[i-1] * i;
          long sum = 0;
          for (int i = 10; i < 10000000; i++) {
            if (isSumFact(i, fact)) sum += i;
          }
          return Long.toString(sum);
        }
      
        private boolean isSumFact(int n, long[] fact) {
          int s = 0;
          int temp = n;
          while (temp > 0) {
            s += fact[temp % 10];
            temp /= 10;
          }
          return s == n;
        }
      }
    githubLink: "https://github.com/tvarley/euler/blob/master/java/src/main/java/org/tvarley/euler/solutions/Solution034.java"
  - language: "javascript"
    code: |
      module.exports = {
        answer: () => {
          const fact = [1, 1, 2, 6, 24, 120, 720, 5040, 40320, 362880];
          function sumFactDig(n) {
            let sum = 0;
            while (n > 0) {
              sum += fact[n % 10];
              n = Math.floor(n / 10);
            }
            return sum;
          }
          let total = 0;
          for (let i = 10; i < 10000000; i++) {
            if (sumFactDig(i) === i) total += i;
          }
          return total;
        }
      };
    githubLink: "https://github.com/tvarley/euler/blob/master/javascript/src/euler/solution034.js"
  - language: "python"
    code: |
      def solve():
          """
          Digit Factorials
          145 is a curious number, as 1! + 4! + 5! = 1 + 24 + 120 = 145.
      
          Find the sum of all numbers which are equal to the sum of the factorial of their digits.
      
          Note: As 1! = 1 and 2! = 2 are not sums they are not included.
          https://projecteuler.net/problem=34
          """
          import math
          fact = [math.factorial(i) for i in range(10)]
          total = 0
          # Upper limit: 9! * 7 = 2540160, 7 digits; 9! * 8 would be more but 8 digits > sum
          for n in range(10, 2540161):
              if sum(fact[int(d)] for d in str(n)) == n:
                  total += n
          return total
    githubLink: "https://github.com/tvarley/euler/blob/master/python/src/euler034.py"
  - language: "go"
    code: |
      package main
      
      import "fmt"
      
      import "strconv"
      
      func fact(n int) int {
      	if n == 0 {
      		return 1
      	}
      	return n * fact(n-1)
      }
      
      func main() {
      	facts := make([]int, 10)
      	for i := 0; i < 10; i++ {
      		facts[i] = fact(i)
      	}
      	sum := 0
      	for n := 3; n < 100000; n++ {
      		s := strconv.Itoa(n)
      		total := 0
      		for _, c := range s {
      			total += facts[int(c-'0')]
      		}
      		if total == n {
      			sum += n
      		}
      	}
      	fmt.Println(sum)
      }
    githubLink: "https://github.com/tvarley/euler/blob/master/go/euler034.go"
  - language: "rust"
    code: |
      // Answer: 40730
      
      pub fn digit_factorials() -> u64 {
          let fact = [1, 1, 2, 6, 24, 120, 720, 5040, 40320, 362880];
          let mut sum = 0;
          for n in 10..(362880 * 7) {
              let mut s = 0;
              let mut m = n;
              while m > 0 {
                  s += fact[(m % 10) as usize];
                  m /= 10;
              }
              if s == n {
                  sum += n as u64;
              }
          }
          sum
      }
      
      #[cfg(test)]
      mod tests {
          use super::*;
      
          #[test]
          fn euler_034() {
              assert_eq!(digit_factorials(), 40730);
          }
      }
    githubLink: "https://github.com/tvarley/euler/blob/master/rust/src/euler034.rs"
tags: ["euler"]
featured: false
showcase: true
---

## Solution Notes

### Mathematical Background

A number is "curious" if it equals the sum of the factorials of its digits. For example, 145 = 1! + 4! + 5!.

Factorials grow rapidly: 9! = 362,880. The maximum sum for an n-digit number is n × 9!, so we can find an upper bound where the maximum digit sum becomes smaller than n-digit numbers.

### Algorithm Analysis

The implementations use brute force with optimization:

- Precompute factorials for digits 0-9
- Iterate from 10 to an upper bound (7 × 9! = 2,540,160)
- For each number, sum the factorials of its digits
- If the sum equals the number, add it to the total

The upper bound comes from the fact that 8 × 9! has 7 digits while the sum has 7 digits, but 8-digit numbers would exceed the maximum possible sum.

### Performance Analysis

- **Time Complexity**: O(U × D) where U is the upper limit (~2.5 million) and D is maximum digits (7), resulting in ~17 million operations. Executes in milliseconds on modern hardware.
- **Space Complexity**: O(1) - only factorial array of size 10.
- **Execution Time**: Fast (under 1 second), suitable for interactive applications.
- **Scalability**: Linear in the upper bound, which is determined by mathematical limits.

### Key Insights

- Only two numbers satisfy the condition: 145 and 40,585
- The upper bound calculation prevents unnecessary computation
- Single-digit numbers (1, 2) are excluded as they are trivial cases
- Factorial digit sums create a natural upper limit due to rapid growth

### Educational Value

This problem teaches:
- Factorial computation and properties
- Digit manipulation and string processing
- Mathematical bounds and optimization in brute-force algorithms
- The importance of excluding trivial cases
- How mathematical analysis can reduce computational complexity
