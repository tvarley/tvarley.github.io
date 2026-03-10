---
problemNumber: 21
title: "Amicable Numbers"
description: "Let d(n) be defined as the sum of proper divisors of n (numbers less than n which divide evenly into n). If d(a) = b and d(b) = a, where a ≠ b, then a and b are an amicable pair and each of a and b are called amicable numbers. For example, the proper divisors of 220 are 1, 2, 4, 5, 10, 11, 20, 22, 44, 55 and 110; therefore d(220) = 284. The proper divisors of 284 are 1, 2, 4, 71 and 142; so d(284) = 220. Evaluate the sum of all the amicable numbers under 10000. Answer: 31626"
difficulty: "hard"
date: 2026-03-10
technologies: ["cpp", "java", "javascript", "python", "ruby", "go", "rust"]
implementations:
  - language: "cpp"
    code: |
      // https://projecteuler.net/problem=21
      // Amicable numbers
      
      // Let d(n) be defined as the sum of proper divisors of n (numbers less than n
      // which divide evenly into n).
      // If d(a) = b and d(b) = a, where a ≠ b, then a and b are an amicable pair and
      // each of a and b are called amicable numbers.
      //
      // For example, the proper divisors of
      // 220 are 1, 2, 4, 5, 10, 11, 20, 22, 44, 55 and 110; therefore d(220) = 284.
      // The proper divisors of 284 are 1, 2, 4, 71 and 142; so d(284) = 220.
      //
      // Evaluate the sum of all the amicable numbers under 10000.
      
      // Answer: 31626
      
      #include <iostream>
      
      int amicable_numbers_sum(int max)
      {
        int a = 0;
        int b = 0;
        int amic_sum = 0;
      
        for( int i = 1; i <= max ;i++){
          // std::cout << "i: " << i << std::endl;
      
          a = 0;
          for(int j = 1 ; j < i ; j++){
            if( 0 == (i%j)){
              a += j;
            }
          }
      
          b = 0;
          for( int k = 1 ; k < a ; k++ ){
            // std::cout << "k: " << k << std::endl;
            if( 0 == (a%k)){
              b += k;
            }
          }
      
          if( b == i && b != a ){
            amic_sum += i;
          }
      
          // std::cout << "Sum A: " << a << std::endl;
          // std::cout << "Sum B: " << b << std::endl;
          // std::cout << "Amic: " << amic_sum << std::endl;
        }
      
        return amic_sum;
      }
      
      
      #if ! defined UNITTEST_MODE
      int main(int argc, char const *argv[]) {
        std::cout << "Answer: " << amicable_numbers_sum(10000) << std::endl;
      }
      #endif //#if ! defined UNITTEST_MODE
    githubLink: "https://github.com/tvarley/euler/blob/master/cpp/src/euler021.cpp"
    performance: "O(n) time complexity"
  - language: "java"
    code: |
      package org.tvarley.euler.solutions;
      
      import org.tvarley.euler.Solution;
      
      public class Solution021 implements Solution {
        public String solve() {
          int[] divisorSums = new int[10000];
          for (int i = 1; i < 10000; i++) {
            divisorSums[i] = sumOfDivisors(i);
          }
      
          int sum = 0;
          for (int a = 1; a < 10000; a++) {
            int b = divisorSums[a];
            if (b < 10000 && b != a && divisorSums[b] == a) {
              sum += a;
            }
          }
      
          return Integer.toString(sum);
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
    githubLink: "https://github.com/tvarley/euler/blob/master/java/src/main/java/org/tvarley/euler/solutions/Solution021.java"
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
      
      module.exports = {
        answer: () => {
          const divisorSums = new Array(10000);
          for (let i = 1; i < 10000; i++) {
            divisorSums[i] = sumOfDivisors(i);
          }
      
          let sum = 0;
          for (let a = 1; a < 10000; a++) {
            const b = divisorSums[a];
            if (b < 10000 && b !== a && divisorSums[b] === a) {
              sum += a;
            }
          }
      
          return sum;
        }
      };
    githubLink: "https://github.com/tvarley/euler/blob/master/javascript/src/euler/solution021.js"
  - language: "python"
    code: |
      def solve():
          """
          Amicable numbers
          Let d(n) be defined as the sum of proper divisors of n (numbers less than n which divide evenly into n).
          If d(a) = b and d(b) = a, where a ≠ b, then a and b are an amicable pair and each of a and b are called amicable numbers.
          For example, the proper divisors of 220 are 1, 2, 4, 5, 10, 11, 20, 22, 44, 55 and 110; therefore d(220) = 284.
          The proper divisors of 284 are 1, 2, 4, 71 and 142; so d(284) = 220.
          Evaluate the sum of all the amicable numbers under 10000.
          """
          def d(n):
              s = 1
              for i in range(2, int(n**0.5) + 1):
                  if n % i == 0:
                      s += i
                      if i != n // i:
                          s += n // i
              return s
      
          amicable = set()
          for a in range(2, 10000):
              b = d(a)
              if b > a and d(b) == a:
                  amicable.add(a)
                  amicable.add(b)
          return sum(amicable)
    githubLink: "https://github.com/tvarley/euler/blob/master/python/src/euler021.py"
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
      
      def euler021_solution
        sum = 0
        seen = {}
        (2..9999).each do |a|
          next if seen[a]
      
          b = sum_proper_divisors(a)
          if b != a && sum_proper_divisors(b) == a && b < 10000
            sum += a + b
            seen[a] = true
            seen[b] = true
          end
        end
        sum
      end
      
      puts euler021_solution if __FILE__ == $PROGRAM_NAME
    githubLink: "https://github.com/tvarley/euler/blob/master/ruby/lib/euler021.rb"
  - language: "go"
    code: |
      package main
      
      import "fmt"
      
      func sumDivisors(n int) int {
      
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
      
          amicable := make(map[int]bool)
      
          for a := 2; a < 10000; a++ {
      
              b := sumDivisors(a)
      
              if b > a && b < 10000 && sumDivisors(b) == a {
      
                  amicable[a] = true
      
                  amicable[b] = true
      
              }
      
          }
      
          sum := 0
      
          for n := range amicable {
      
              sum += n
      
          }
      
          fmt.Println(sum)
      
      }
    githubLink: "https://github.com/tvarley/euler/blob/master/go/euler021.go"
  - language: "rust"
    code: |
      // https://projecteuler.net/problem=21
      //
      // Let d(n) be defined as the sum of proper divisors of n (numbers less than n which divide evenly into n).
      // If d(a) = b and d(b) = a, where a ≠ b, then a and b are an amicable pair and each of a and b are called amicable numbers.
      //
      // For example, the proper divisors of 220 are 1, 2, 4, 5, 10, 11, 20, 22, 44, 55 and 110; therefore d(220) = 284. The proper divisors of 284 are 1, 2, 4, 71 and 142; so d(284) = 220.
      //
      // Evaluate the sum of all the amicable numbers under 10000.
      //
      // Answer: 31626
      
      pub fn amicable_numbers(limit: usize) -> u64 {
          let mut sum_div = vec![0u64; limit + 1];
          for i in 1..=limit {
              for j in (i * 2..=limit).step_by(i) {
                  sum_div[j] += i as u64;
              }
          }
          let mut sum = 0u64;
          for i in 1..limit {
              let j = sum_div[i];
              if j <= limit as u64 && j != i as u64 && sum_div[j as usize] == i as u64 && i < j as usize {
                  sum += i as u64 + j;
              }
          }
          sum
      }
      
      #[cfg(test)]
      mod tests {
          use super::*;
      
          #[test]
          fn euler_021() {
              assert_eq!(amicable_numbers(10000), 31626);
          }
      }
    githubLink: "https://github.com/tvarley/euler/blob/master/rust/src/euler021.rs"
tags: ["euler"]
featured: false
showcase: true
---

## Additional Notes

This is Project Euler problem 21: Amicable Numbers.

Let d(n) be defined as the sum of proper divisors of n (numbers less than n which divide evenly into n). If d(a) = b and d(b) = a, where a ≠ b, then a and b are an amicable pair and each of a and b are called amicable numbers. For example, the proper divisors of 220 are 1, 2, 4, 5, 10, 11, 20, 22, 44, 55 and 110; therefore d(220) = 284. The proper divisors of 284 are 1, 2, 4, 71 and 142; so d(284) = 220. Evaluate the sum of all the amicable numbers under 10000. Answer: 31626
