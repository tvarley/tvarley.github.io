---
problemNumber: 14
title: "Longest Collatz Sequence"
description: |
  The following iterative sequence is defined for the set of positive integers:

  - $n 	o n/2$ ($n$ is even)
  - $n 	o 3n + 1$ ($n$ is odd)

  Using the rule above and starting with $13$, we generate the following sequence:

  $$13 	o 40 	o 20 	o 10 	o 5 	o 16 	o 8 	o 4 	o 2 	o 1$$

  It can be seen that this sequence (starting at $13$ and finishing at $1$) contains $10$ terms. Although it has not been proved yet (Collatz Problem), it is thought that all starting numbers finish at $1$.

  Which starting number, under one million, produces the longest chain?

  **NOTE:** Once the chain starts the terms are allowed to go above one million.
difficulty: "medium"
date: 2026-03-10
technologies: ["cpp", "java", "javascript", "python", "ruby", "go", "rust"]
implementations:
  - language: "cpp"
    code: |
      // https://projecteuler.net/problem=14
      // Longest Collatz sequence
      
      // The following iterative sequence is defined for the set of positive integers:
      //
      // n → n/2 (n is even)
      // n → 3n + 1 (n is odd)
      //
      // Using the rule above and starting with 13, we generate the following sequence:
      //
      // 13 → 40 → 20 → 10 → 5 → 16 → 8 → 4 → 2 → 1
      // It can be seen that this sequence (starting at 13 and finishing at 1) contains 10 terms.
      // Although it has not been proved yet (Collatz Problem),
      // it is thought that all starting numbers finish at 1.
      //
      // Which starting number, under one million, produces the longest chain?
      //
      // NOTE: Once the chain starts the terms are allowed to go above one million.
      
      // Answer: 837799
      
      #include <iostream>
      #include <vector>
      #include <cmath>
      #include <cstdint>
      
      uint64_t next_collatz_term(uint64_t prev)
      {
        uint64_t ret;
        if( 0 == (prev%2)){
          ret = prev/2;
        }else{
          ret = (3 * prev)+1;
        }
        return ret;
      }
      
      static std::vector<int> previous_counts(1000000,-1);
      
      int count_collatz_terms_brute(uint64_t start)
      {
        int count = 1;
        while( 1 != start ){
          start = next_collatz_term(start);
          count++;
        }
        return count;
      }
      
      int count_collatz_terms_opt(uint64_t start)
      {
        if( 1 == start ) return 1;
      
        int count = 0;
      
        if( start < 1000000 ){
          count = previous_counts.at(start);
          if( -1 == count ){
            count = count_collatz_terms_opt(next_collatz_term(start));
            count++;
            previous_counts.at(start) = count;
          }
        }else{
          count = count_collatz_terms_brute(start);
        }
      
        return count;
      }
      
      uint64_t longest_collatz_sequence_brute(uint64_t max_check)
      {
        int max_count = 0;
        int max_counter = 0;
        for (uint64_t i = 1; i < max_check; i++) {
            int terms = count_collatz_terms_brute(i);
            if( max_count < terms ){
              max_count = terms;
              max_counter = i;
            }
        }
        return max_counter;
      }
      
      // Optimization, store previous counts and skip already calculated values.
      uint64_t longest_collatz_sequence_opt(uint64_t max_check)
      {
        int max_count = 0;
        int max_counter = 0;
      
        for (uint64_t i = 2; i < max_check; i++) {
          if( -1 == previous_counts.at(i) ){
            int count = count_collatz_terms_opt(i);
            if( max_count < count ){
              max_count = count;
              max_counter = i;
            }
          }
        }
      
        return max_counter;
      }
      
      #if ! defined UNITTEST_MODE
      int main(int argc, char const *argv[])
      {
        std::cout << "Check(1): " << count_collatz_terms_opt(13) << std::endl;
        std::cout << "Check(2): " << count_collatz_terms_brute(13) << std::endl;
      
        int answer = longest_collatz_sequence_brute(1000000);
        std::cout << "Answer: " << answer
                                << '/' << count_collatz_terms_brute(answer)
                                << std::endl;
      
        answer = longest_collatz_sequence_opt(1000000);
        std::cout << "Answer: " << answer
                                << '/' << count_collatz_terms_opt(answer)
                                << std::endl;
      }
      #endif // #if ! defined UNITTEST_MODE
    githubLink: "https://github.com/tvarley/euler/blob/master/cpp/src/euler014.cpp"
    performance: "O(n) time complexity"
  - language: "java"
    code: |
      package org.tvarley.euler.solutions;
      
      import org.tvarley.euler.Solution;
      
      public class Solution014 implements Solution {
        private static final int MAX = 1000000;
        private int[] cache = new int[MAX];
      
        public String solve() {
          int maxLength = 0;
          int startingNumber = 0;
      
          for (int i = 1; i < MAX; i++) {
            int length = getSequenceLength(i);
            if (length > maxLength) {
              maxLength = length;
              startingNumber = i;
            }
          }
      
          return Integer.toString(startingNumber);
        }
      
        private int getSequenceLength(long n) {
          if (n < MAX && cache[(int)n] != 0) {
            return cache[(int)n];
          }
      
          int length = 1;
          long current = n;
      
          while (current != 1) {
            if (current % 2 == 0) {
              current = current / 2;
            } else {
              current = 3 * current + 1;
            }
            length++;
      
            if (current < MAX && cache[(int)current] != 0) {
              length += cache[(int)current] - 1;
              break;
            }
          }
      
          if (n < MAX) {
            cache[(int)n] = length;
          }
      
          return length;
        }
      }
    githubLink: "https://github.com/tvarley/euler/blob/master/java/src/main/java/org/tvarley/euler/solutions/Solution014.java"
  - language: "javascript"
    code: |
      const memo = new Map();
      
      function collatzLength(n) {
        if (n === 1) return 1;
        if (memo.has(n)) return memo.get(n);
      
        let length;
        if (n % 2 === 0) {
          length = 1 + collatzLength(n / 2);
        } else {
          length = 1 + collatzLength(3 * n + 1);
        }
      
        memo.set(n, length);
        return length;
      }
      
      module.exports = {
        answer: () => {
          let maxLength = 0;
          let maxNumber = 0;
      
          for (let i = 1; i < 1000000; i++) {
            const length = collatzLength(i);
            if (length > maxLength) {
              maxLength = length;
              maxNumber = i;
            }
          }
      
          return maxNumber;
        }
      };
    githubLink: "https://github.com/tvarley/euler/blob/master/javascript/src/euler/solution014.js"
  - language: "python"
    code: |
      def solve():
          """
          Longest Collatz sequence
          The following iterative sequence is defined for the set of positive integers:
          n → n/2 (n is even)
          n → 3n + 1 (n is odd)
          Using the rule above and starting with 13, we generate the following sequence:
          13 → 40 → 20 → 10 → 5 → 16 → 8 → 4 → 2 → 1
          It can be seen that this sequence (starting at 13 and finishing at 1) contains 10 terms.
          Although it has not been proved yet (Collatz Problem), it is thought that all starting numbers finish at 1.
          Which starting number, under one million, produces the longest chain?
          NOTE: Once the chain starts the terms are allowed to go above one million.
          """
          memo = {}
          def collatz_length(n):
              if n == 1:
                  return 1
              if n in memo:
                  return memo[n]
              if n % 2 == 0:
                  length = 1 + collatz_length(n // 2)
              else:
                  length = 1 + collatz_length(3 * n + 1)
              memo[n] = length
              return length
      
          max_length = 0
          max_start = 0
          for i in range(1, 1000000):
              length = collatz_length(i)
              if length > max_length:
                  max_length = length
                  max_start = i
          return max_start
    githubLink: "https://github.com/tvarley/euler/blob/master/python/src/euler014.py"
  - language: "ruby"
    code: |
      $cache = []
      
      def collatz_sequence_length(start, options = {})
        options = { cache: true }.merge(options)
      
        chain_length = 1
        current_value = start
      
        while current_value != 1
          unless $cache[current_value].nil?
            chain_length += $cache[current_value]
            break
          end
      
          chain_length += 1
      
          if current_value.even?
            current_value /= 2
          else
            current_value = (current_value * 3) + 1
          end
        end
      
        $cache[start] = chain_length if options[:cache]
        chain_length
      end
      
      def longest_collatz_sequence_process(options = {})
        longest_starting_number = 1
      
        max_chain_length = -1
      
        2.upto(1_000_000) do |i|
          chain_length = collatz_sequence_length(i, options)
          if chain_length > max_chain_length
            longest_starting_number = i
            max_chain_length = chain_length
          end
        end
        longest_starting_number
      end
      # rubocop:enable Style/GlobalVars
      
      def longest_collatz_sequence
        longest_collatz_sequence_process
        # require 'benchmark'
        # Benchmark.measure { longest_collatz_sequence_process(cache: false) }
        # Cache on: 3.460000   0.110000   3.570000 (  3.580396)
        # Cache off: 22.350000   0.200000  22.550000 ( 22.635814)
      end
      
      puts longest_collatz_sequence if __FILE__ == $PROGRAM_NAME
    githubLink: "https://github.com/tvarley/euler/blob/master/ruby/lib/euler014.rb"
  - language: "go"
    code: |
      package main
      
      import "fmt"
      
      func collatzLength(n int, memo map[int]int) int {
      
          if n == 1 {
      
              return 1
      
          }
      
          if length, ok := memo[n]; ok {
      
              return length
      
          }
      
          var next int
      
          if n%2 == 0 {
      
              next = n / 2
      
          } else {
      
              next = 3*n + 1
      
          }
      
          length := 1 + collatzLength(next, memo)
      
          memo[n] = length
      
          return length
      
      }
      
      func main() {
      
          memo := make(map[int]int)
      
          maxLength := 0
      
          maxStart := 0
      
          for i := 1; i < 1000000; i++ {
      
              length := collatzLength(i, memo)
      
              if length > maxLength {
      
                  maxLength = length
      
                  maxStart = i
      
              }
      
          }
      
          fmt.Println(maxStart)
      
      }
    githubLink: "https://github.com/tvarley/euler/blob/master/go/euler014.go"
  - language: "rust"
    code: |
      // https://projecteuler.net/problem=14
      //
      // The following iterative sequence is defined for the set of positive integers:
      //
      // n → n/2 (n is even)
      // n → 3n + 1 (n is odd)
      //
      // Using the rule above and starting with 13, we generate the following sequence:
      //
      // 13 → 40 → 20 → 10 → 5 → 16 → 8 → 4 → 2 → 1
      //
      // It can be seen that this sequence (starting at 13 and finishing at 1) contains 10 terms. Although it has not been proved yet (Collatz Problem), it is thought that all starting numbers finish at 1.
      //
      // Which starting number, under one million, produces the longest chain?
      //
      // NOTE: Once the chain starts the terms are allowed to go above one million.
      //
      // Answer: 837799
      
      use std::collections::HashMap;
      
      pub fn longest_collatz_sequence(limit: usize) -> usize {
          let mut memo = HashMap::new();
          memo.insert(1, 1u64);
          let mut max_length = 0;
          let mut max_start = 1;
          for start in 1..limit {
              let mut n = start as u64;
              let mut path = vec![];
              while !memo.contains_key(&n) {
                  path.push(n);
                  if n % 2 == 0 {
                      n /= 2;
                  } else {
                      n = 3 * n + 1;
                  }
              }
              let mut length = memo[&n];
              for &p in path.iter().rev() {
                  length += 1;
                  memo.insert(p, length);
              }
              if length > max_length {
                  max_length = length;
                  max_start = start;
              }
          }
          max_start
      }
      
      #[cfg(test)]
      mod tests {
          use super::*;
      
          #[test]
          fn euler_014() {
              assert_eq!(longest_collatz_sequence(1_000_000), 837_799);
          }
      }
    githubLink: "https://github.com/tvarley/euler/blob/master/rust/src/euler014.rs"
tags: ["euler"]
featured: false
showcase: true
---

## Solution Notes

### Mathematical Background

The Collatz conjecture (also known as the $3n + 1$ problem) is an unsolved mathematical problem that asks whether repeating two simple arithmetic operations will eventually transform every positive integer into 1. The operations are:

- If the number is even, divide it by 2
- If the number is odd, multiply by 3 and add 1

The sequence length is the count of steps needed to reach 1. For example, starting with 13 produces a 10-term sequence. While the conjecture remains unproven, it has been verified for all starting values up to very large numbers.

### Algorithm Analysis

**Brute force approach**: For each starting number from 1 to 999,999, compute the complete Collatz sequence until reaching 1, counting the steps. This is inefficient as it recomputes sequences for numbers that appear in multiple chains.

**Memoization optimization**: Store the sequence lengths for each number as they're computed. When a previously computed number is encountered, reuse its stored length instead of recalculating. This reduces redundant computations significantly.

**Space complexity**: O(MAX) for the memoization array, where MAX = 1,000,000.
**Time complexity**: O(MAX + total operations), but memoization makes it effectively linear in the number of starting values.

### Key Insights

- The sequence can exceed the starting limit (terms can go above 1,000,000)
- Memoization prevents recomputing chains for numbers encountered multiple times
- Most sequences are short, but some starting values produce very long chains
- The optimal starting number 837,799 produces a chain of 525 terms
- Performance optimization is crucial due to the large search space

### Educational Value

This problem demonstrates:
- Dynamic programming and memoization techniques
- The importance of caching intermediate results
- Trade-offs between time and space complexity
- Working with sequences and iterative algorithms
- Handling large search spaces efficiently
- The Collatz conjecture as an example of an unsolved mathematical problem
- When optimization matters for computational feasibility
