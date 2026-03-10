---
problemNumber: 23
title: "Non-Abundant Sums"
description: "A perfect number is a number for which the sum of its proper divisors is exactly equal to the number. A number n is called deficient if the sum of its proper divisors is less than n and it is called abundant if this sum exceeds n. As 12 is the smallest abundant number, the smallest number that can be written as the sum of two abundant numbers is 24. By mathematical analysis, it can be shown that all integers greater than 28123 can be written as the sum of two abundant numbers. Find the sum of all the positive integers which cannot be written as the sum of two abundant numbers. Answer: 4179871"
difficulty: "hard"
date: 2026-03-10
technologies: ["cpp", "java", "javascript", "python", "ruby", "go", "rust"]
implementations:
  - language: "cpp"
    code: |
      // https://projecteuler.net/problem=23
      // Non-abundant sums
      
      // A perfect number is a number for which the sum of its proper divisors is
      // exactly equal to the number. For example, the sum of the proper divisors of
      // 28 would be 1 + 2 + 4 + 7 + 14 = 28, which means that 28 is a perfect number.
      //
      // A number n is called deficient if the sum of its proper divisors is less
      // than n and it is called abundant if this sum exceeds n.
      //
      // As 12 is the smallest abundant number, 1 + 2 + 3 + 4 + 6 = 16, the smallest
      // number that can be written as the sum of two abundant numbers is 24.
      // By mathematical analysis, it can be shown that all integers greater than
      // 28123 can be written as the sum of two abundant numbers.
      // However, this upper limit cannot be reduced any further by analysis even
      // though it is known that the greatest number that cannot be expressed as the
      // sum of two abundant numbers is less than this limit.
      //
      // Find the sum of all the positive integers which cannot be written as
      // the sum of two abundant numbers.
      
      // Answer: 4179871
      
      #include <algorithm>
      #include <array>
      #include <cmath>
      #include <iostream>
      #include <vector>
      
      enum HOW_PERFECT
      {
        PERFECT,
        DEFICIENT,
        ABUNDENT
      };
      
      HOW_PERFECT how_perfect(int number)
      {
        int sum{1};
        int i = 2;
        for (int j = number; i < j; ++i) {
          if ( number % i == 0 ) {
            sum += i;
            j = number / i;
            if (i == j)
               break;
            sum += j;
          }
        }
      
        if(sum == number){
          return PERFECT;
        }else if(sum < number){
          return DEFICIENT;
        }else{
          return ABUNDENT;
        }
      }
      
      long non_abundunt_sums()
      {
        constexpr int max{28123};
        std::vector<int> abundents;
        for( int i{1} ; i <= max ; ++i ){
          if(how_perfect(i) == ABUNDENT) {
            abundents.push_back(i);
          }
        }
        std::array<bool, max> are_sums{};
        for( unsigned i{}; i < abundents.size(); ++i ) {
          for( unsigned j{i} ; ; ++j ) {
            long k = abundents[i] + abundents[j];
            if( k >= max ) {
              break;
            }
            are_sums[k] = true;
          }
        }
        long sum{};
        for (int i{}; i < max; ++i) {
          if (!are_sums[i]) {
            sum += i;
          }
        }
        
        return sum;
      }
      
      #if ! defined UNITTEST_MODE
      int main(int argc, char const *argv[])
      {
        std::cout << "Answer: " << non_abundunt_sums() << std::endl;
      }
      #endif //#if ! defined UNITTEST_MODE
    githubLink: "https://github.com/tvarley/euler/blob/master/cpp/src/euler023.cpp"
    performance: "O(n) time complexity"
  - language: "java"
    code: |
      package org.tvarley.euler.solutions;
      
      import org.tvarley.euler.Solution;
      import java.util.ArrayList;
      import java.util.List;
      
      public class Solution023 implements Solution {
        private static final int LIMIT = 28123;
      
        public String solve() {
          List<Integer> abundant = new ArrayList<>();
          for (int i = 12; i <= LIMIT; i++) {
            if (sumOfDivisors(i) > i) {
              abundant.add(i);
            }
          }
      
          boolean[] canBeSum = new boolean[LIMIT + 1];
          for (int i = 0; i < abundant.size(); i++) {
            for (int j = i; j < abundant.size(); j++) {
              int sum = abundant.get(i) + abundant.get(j);
              if (sum <= LIMIT) {
                canBeSum[sum] = true;
              } else {
                break;
              }
            }
          }
      
          long total = 0;
          for (int i = 1; i <= LIMIT; i++) {
            if (!canBeSum[i]) {
              total += i;
            }
          }
      
          return Long.toString(total);
        }
      
        private int sumOfDivisors(int n) {
          int sum = 1;
          for (int i = 2; (long) i * i <= n; i++) {
            if (n % i == 0) {
              sum += i;
              if (i != n / i) sum += n / i;
            }
          }
          return sum;
        }
      }
    githubLink: "https://github.com/tvarley/euler/blob/master/java/src/main/java/org/tvarley/euler/solutions/Solution023.java"
  - language: "javascript"
    code: |
      function sumOfDivisors(n) {
        let sum = 1; // 1 is always a divisor
        for (let i = 2; i * i <= n; i++) {
          if (n % i === 0) {
            sum += i;
            if (i !== n / i) sum += n / i;
          }
        }
        return sum;
      }
      
      function isAbundant(n) {
        return sumOfDivisors(n) > n;
      }
      
      module.exports = {
        answer: () => {
          const limit = 28123;
          const abundant = [];
      
          // Find all abundant numbers up to limit
          for (let i = 12; i <= limit; i++) {
            if (isAbundant(i)) {
              abundant.push(i);
            }
          }
      
          // Create boolean array for sums of two abundant numbers
          const canBeSum = new Array(limit + 1).fill(false);
      
          // Mark all sums of two abundant numbers
          for (let i = 0; i < abundant.length; i++) {
            for (let j = i; j < abundant.length; j++) {
              const sum = abundant[i] + abundant[j];
              if (sum <= limit) {
                canBeSum[sum] = true;
              }
            }
          }
      
          // Sum all numbers that cannot be written as sum of two abundant numbers
          let total = 0;
          for (let i = 1; i <= limit; i++) {
            if (!canBeSum[i]) {
              total += i;
            }
          }
      
          return total;
        }
      };
    githubLink: "https://github.com/tvarley/euler/blob/master/javascript/src/euler/solution023.js"
  - language: "python"
    code: |
      def solve():
          """
          Non-abundant sums
          A perfect number is a number for which the sum of its proper divisors is exactly equal
          to the number. A number n is called deficient if the sum of its proper divisors is less
          than n and it is called abundant if this sum exceeds n.
          As 12 is the smallest abundant number, 1 + 2 + 3 + 4 + 6 = 16, the smallest number
          that can be written as the sum of two abundant numbers is 24. By mathematical analysis,
          it can be shown that all integers greater than 28123 can be written as the sum of two
          abundant numbers. Find the sum of all the positive integers which cannot be written as
          the sum of two abundant numbers.
          https://projecteuler.net/problem=23
          """
          LIMIT = 28123
      
          def sum_divisors(n):
              s = 1
              for i in range(2, int(n**0.5) + 1):
                  if n % i == 0:
                      s += i
                      if i != n // i:
                          s += n // i
              return s
      
          abundants = [n for n in range(2, LIMIT + 1) if sum_divisors(n) > n]
          abundant_set = set(abundants)
      
          non_sum = 0
          for n in range(1, LIMIT + 1):
              if not any((n - a) in abundant_set for a in abundants if a <= n):
                  non_sum += n
          return non_sum
    githubLink: "https://github.com/tvarley/euler/blob/master/python/src/euler023.py"
  - language: "ruby"
    code: |
      def sum_proper_divisors(n)
        return 0 if n == 1
      
        sum = 1
        (2..Math.sqrt(n).to_i).each do |i|
          if n % i == 0
            sum += i
            sum += n / i unless i == n / i
          end
        end
        sum
      end
      
      def euler023_solution
        limit = 28_123
        abundant = []
        (2..limit).each do |n|
          abundant << n if sum_proper_divisors(n) > n
        end
      
        can_be_sum = Array.new(limit + 1, false)
        abundant.each do |a|
          abundant.each do |b|
            sum = a + b
            break if sum > limit
            can_be_sum[sum] = true
          end
        end
      
        sum = 0
        (1..limit).each do |n|
          sum += n unless can_be_sum[n]
        end
        sum
      end
      
      puts euler023_solution if __FILE__ == $PROGRAM_NAME
    githubLink: "https://github.com/tvarley/euler/blob/master/ruby/lib/euler023.rb"
  - language: "go"
    code: |
      package main
      
      import "fmt"
      
      func sumDiv(n int) int {
          sum := 1
          for i := 2; i*i <= n; i++ {
              if n%i == 0 {
                  sum += i
                  if i != n/i {
                      sum += n / i
                  }
              }
          }
          return sum
      }
      
      func main() {
          const limit = 28124
          var abundants []int
          for i := 2; i < limit; i++ {
              if sumDiv(i) > i {
                  abundants = append(abundants, i)
              }
          }
      
          canWrite := make([]bool, limit)
          for i, a := range abundants {
              for _, b := range abundants[i:] {
                  s := a + b
                  if s >= limit {
                      break
                  }
                  canWrite[s] = true
              }
          }
      
          total := 0
          for i := 1; i < limit; i++ {
              if !canWrite[i] {
                  total += i
              }
          }
      
          fmt.Println(total)
      }
    githubLink: "https://github.com/tvarley/euler/blob/master/go/euler023.go"
  - language: "rust"
    code: |
      // https://projecteuler.net/problem=23
      //
      // A perfect number is a number for which the sum of its proper divisors is exactly equal
      // to the number. A number n is called deficient if the sum of its proper divisors is less
      // than n and it is called abundant if this sum exceeds n.
      //
      // As 12 is the smallest abundant number, 1 + 2 + 3 + 4 + 6 = 16, the smallest number
      // that can be written as the sum of two abundant numbers is 24.
      // By mathematical analysis, it can be shown that all integers greater than 28123 can be
      // written as the sum of two abundant numbers.
      //
      // Find the sum of all the positive integers which cannot be written as the sum of two
      // abundant numbers.
      //
      // Answer: 4179871
      
      const LIMIT: usize = 28124;
      
      fn sum_proper_divisors(n: usize) -> usize {
          if n <= 1 {
              return 0;
          }
          let mut sum = 1;
          let mut i = 2;
          while i * i <= n {
              if n % i == 0 {
                  sum += i;
                  if i != n / i {
                      sum += n / i;
                  }
              }
              i += 1;
          }
          sum
      }
      
      pub fn non_abundant_sums() -> u64 {
          let abundants: Vec<usize> = (1..LIMIT)
              .filter(|&n| sum_proper_divisors(n) > n)
              .collect();
      
          let mut is_sum = vec![false; LIMIT];
          'outer: for i in 0..abundants.len() {
              for j in i..abundants.len() {
                  let s = abundants[i] + abundants[j];
                  if s >= LIMIT {
                      continue 'outer;
                  }
                  is_sum[s] = true;
              }
          }
      
          (1..LIMIT)
              .filter(|&n| !is_sum[n])
              .map(|n| n as u64)
              .sum()
      }
      
      #[cfg(test)]
      mod tests {
          use super::*;
      
          #[test]
          fn euler_023() {
              assert_eq!(non_abundant_sums(), 4_179_871);
          }
      }
    githubLink: "https://github.com/tvarley/euler/blob/master/rust/src/euler023.rs"
tags: ["euler"]
featured: false
showcase: true
---

## Additional Notes

This is Project Euler problem 23: Non-Abundant Sums.

A perfect number is a number for which the sum of its proper divisors is exactly equal to the number. A number n is called deficient if the sum of its proper divisors is less than n and it is called abundant if this sum exceeds n. As 12 is the smallest abundant number, the smallest number that can be written as the sum of two abundant numbers is 24. By mathematical analysis, it can be shown that all integers greater than 28123 can be written as the sum of two abundant numbers. Find the sum of all the positive integers which cannot be written as the sum of two abundant numbers. Answer: 4179871
