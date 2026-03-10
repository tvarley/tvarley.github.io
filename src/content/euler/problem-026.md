---
problemNumber: 26
title: "Reciprocal Cycles"
description: |
  A unit fraction contains $1$ in the numerator. The decimal representation of the unit fractions with denominators $2$ to $10$ are given:

  $$\begin{align}
  1/2 &= 0.5\\
  1/3 &=0.(3)\\
  1/4 &=0.25\\
  1/5 &= 0.2\\
  1/6 &= 0.1(6)\\
  1/7 &= 0.(142857)\\
  1/8 &= 0.125\\
  1/9 &= 0.(1)\\
  1/10 &= 0.1
  \end{align}$$

  Where $0.1(6)$ means $0.166666\cdots$, and has a $1$-digit recurring cycle. It can be seen that $1/7$ has a $6$-digit recurring cycle.

  Find the value of $d \lt 1000$ for which $1/d$ contains the longest recurring cycle in its decimal fraction part.
difficulty: "hard"
date: 2026-03-10
technologies: ["cpp", "java", "javascript", "python", "ruby", "go", "rust"]
implementations:
  - language: "cpp"
    code: |
      // https://projecteuler.net/problem=26
      
      // A unit fraction contains 1 in the numerator. The decimal representation of the unit fractions with denominators 2 to 10 are given:
      
      // 1/2 = 0.5
      // 1/3 = 0.(3)
      // 1/4 = 0.25
      // 1/5 = 0.2
      // 1/6 = 0.1(6)
      // 1/7 = 0.(142857)
      // 1/8 = 0.125
      // 1/9 = 0.(1)
      // 1/10 = 0.1
      
      // Where 0.1(6) means 0.1666..., and has a 1-digit recurring cycle. It can be seen that 1/7 has a 6-digit recurring cycle.
      
      // Find the value of d < 1000 for which 1/d contains the longest recurring cycle in its decimal fraction part.
      //
      // Answer: 983
      //
      // Authored by: Tim Varley 💘
      // Assisted-by: Grok Code Fast via Crush 💘 <crush@charm.land>
      
      #include <iostream>
      #include <map>
      
      int longest_reciprocal_cycle(int max_d) {
          int max_cycle = 0;
          int max_d_val = 0;
          for (int d = 2; d < max_d; ++d) {
              std::map<int, int> remainder_positions;
              int remainder = 1;
              int position = 0;
              while (remainder != 0 && remainder_positions.find(remainder) == remainder_positions.end()) {
                  remainder_positions[remainder] = position;
                  remainder *= 10;
                  remainder %= d;
                  ++position;
              }
              if (remainder != 0) {
                  int cycle_length = position - remainder_positions[remainder];
                  if (cycle_length > max_cycle) {
                      max_cycle = cycle_length;
                      max_d_val = d;
                  }
              }
          }
          return max_d_val;
      }
      
      #if ! defined UNITTEST_MODE
      int main(int argc, char const *argv[]) {
          std::cout << longest_reciprocal_cycle(1000) << std::endl;
      }
      #endif // UNITTEST_MODE
    githubLink: "https://github.com/tvarley/euler/blob/master/cpp/src/euler026.cpp"
    performance: "O(n) time complexity"
  - language: "java"
    code: |
      package org.tvarley.euler.solutions;
      
      import org.tvarley.euler.Solution;
      
      public class Solution026 implements Solution {
        public String solve() {
          int maxCycle = 0;
          int result = 0;
      
          for (int d = 2; d < 1000; d++) {
            int len = cycleLength(d);
            if (len > maxCycle) {
              maxCycle = len;
              result = d;
            }
          }
      
          return Integer.toString(result);
        }
      
        private int cycleLength(int d) {
          int[] remainders = new int[d];
          int remainder = 1;
          int position = 0;
      
          while (remainder != 0) {
            if (remainders[remainder] != 0) {
              return position - remainders[remainder];
            }
            remainders[remainder] = position;
            remainder = (remainder * 10) % d;
            position++;
          }
      
          return 0;
        }
      }
    githubLink: "https://github.com/tvarley/euler/blob/master/java/src/main/java/org/tvarley/euler/solutions/Solution026.java"
  - language: "javascript"
    code: |
      function cycleLength(d) {
        const remainders = new Map();
        let remainder = 1;
        let position = 0;
      
        while (remainder !== 0) {
          if (remainders.has(remainder)) {
            return position - remainders.get(remainder);
          }
          remainders.set(remainder, position);
          remainder = (remainder * 10) % d;
          position++;
        }
      
        return 0;
      }
      
      module.exports = {
        answer: () => {
          let maxCycle = 0;
          let result = 0;
      
          for (let d = 2; d < 1000; d++) {
            const len = cycleLength(d);
            if (len > maxCycle) {
              maxCycle = len;
              result = d;
            }
          }
      
          return result;
        }
      };
    githubLink: "https://github.com/tvarley/euler/blob/master/javascript/src/euler/solution026.js"
  - language: "python"
    code: |
      def solve():
          """
          Reciprocal cycles
          A unit fraction contains 1 in the numerator. The decimal representation of the unit
          fractions with denominators 2 to 10 are given. Where 0.1(6) means 0.166666..., the
          recurring part is in parentheses. Find the value of d < 1000 for which 1/d contains
          the longest recurring cycle in its decimal fraction part.
          https://projecteuler.net/problem=26
          """
          def cycle_length(d):
              remainders = {}
              r = 1
              pos = 0
              while r != 0:
                  if r in remainders:
                      return pos - remainders[r]
                  remainders[r] = pos
                  r = (r * 10) % d
                  pos += 1
              return 0
      
          best_d, best_len = 1, 0
          for d in range(2, 1000):
              length = cycle_length(d)
              if length > best_len:
                  best_len = length
                  best_d = d
          return best_d
    githubLink: "https://github.com/tvarley/euler/blob/master/python/src/euler026.py"
  - language: "ruby"
    code: |
      def cycle_length(d)
        seen = {}
        remainder = 1
        position = 0
        while remainder != 0 && !seen[remainder]
          seen[remainder] = position
          remainder *= 10
          remainder %= d
          position += 1
        end
        remainder == 0 ? 0 : position - seen[remainder]
      end
      
      def euler026_solution
        max_length = 0
        max_d = 0
        (2..999).each do |d|
          len = cycle_length(d)
          if len > max_length
            max_length = len
            max_d = d
          end
        end
        max_d
      end
      
      puts euler026_solution if __FILE__ == $PROGRAM_NAME
    githubLink: "https://github.com/tvarley/euler/blob/master/ruby/lib/euler026.rb"
  - language: "go"
    code: |
      package main
      
      import "fmt"
      
      func cycleLength(d int) int {
          remainders := make(map[int]int)
          r := 1
          pos := 0
          for r != 0 {
              if prev, ok := remainders[r]; ok {
                  return pos - prev
              }
              remainders[r] = pos
              r = (r * 10) % d
              pos++
          }
          return 0
      }
      
      func main() {
          best, bestLen := 0, 0
          for d := 2; d < 1000; d++ {
              l := cycleLength(d)
              if l > bestLen {
                  bestLen = l
                  best = d
              }
          }
          fmt.Println(best)
      }
    githubLink: "https://github.com/tvarley/euler/blob/master/go/euler026.go"
  - language: "rust"
    code: |
      // https://projecteuler.net/problem=26
      //
      // A unit fraction contains 1 in the numerator. The decimal representation of the unit
      // fractions with denominators 2 to 10 are given:
      // 1/6 = 0.1(6), where the cycle length is 1.
      // 1/7 = 0.(142857), where the cycle length is 6.
      //
      // Find the value of d < 1000 for which 1/d contains the longest recurring cycle in its
      // decimal fraction part.
      //
      // Answer: 983
      
      fn cycle_length(d: u32) -> usize {
          let mut remainders = vec![0usize; d as usize];
          let mut r = 1usize;
          let mut pos = 0usize;
          loop {
              r %= d as usize;
              if r == 0 {
                  return 0;
              }
              if remainders[r] != 0 {
                  return pos - remainders[r] + 1;
              }
              remainders[r] = pos + 1;
              r *= 10;
              pos += 1;
          }
      }
      
      pub fn longest_recurring_cycle(limit: u32) -> u32 {
          let mut best_d = 0u32;
          let mut best_len = 0usize;
          for d in 2..limit {
              let len = cycle_length(d);
              if len > best_len {
                  best_len = len;
                  best_d = d;
              }
          }
          best_d
      }
      
      #[cfg(test)]
      mod tests {
          use super::*;
      
          #[test]
          fn euler_026() {
              assert_eq!(longest_recurring_cycle(1000), 983);
          }
      }
    githubLink: "https://github.com/tvarley/euler/blob/master/rust/src/euler026.rs"
tags: ["euler"]
featured: false
showcase: true
---

## Solution Notes

### Mathematical Background

This problem explores the decimal representations of unit fractions and their recurring cycles. The length of the recurring cycle for $1/d$ is determined by the multiplicative order of 10 modulo d, or more precisely, by the period of the decimal expansion.

For a fraction $1/d$ in lowest terms, the decimal expansion will be periodic with period equal to the smallest k such that $10^k ≡ 1 \pmod{d}$. The period length depends on the prime factors of d.

### Algorithm Analysis

**Long division simulation**: Perform long division of 1 by d, tracking remainders to detect when the division repeats.

**Cycle detection**: Use a map to store the position where each remainder first occurred. When a remainder repeats, the cycle length is current position minus stored position.

**Key optimization**: Only check denominators that don't share factors with 2 or 5, as these produce terminating decimals.

**Search strategy**: For each d from 2 to 999, compute the cycle length and track the maximum.

Time complexity is O(MAX × log MAX) due to the cycle detection process. Space complexity is O(MAX) for remainder tracking.

### Key Insights

- The longest cycle occurs for d = 983, with a 982-digit recurring cycle
- Only primes not dividing 2 or 5 can produce long cycles
- The cycle length for prime p is the order of 10 modulo p
- Some composite numbers can have longer cycles than primes
- This demonstrates the connection between number theory and decimal arithmetic

### Educational Value

This problem teaches:
- Decimal expansion and periodic fractions
- The mathematics of recurring decimals
- Cycle detection algorithms
- Modular arithmetic applications
- The relationship between number theory and decimal representations
- Efficient computation of long division
- When to use mathematical insights to optimize brute force approaches
