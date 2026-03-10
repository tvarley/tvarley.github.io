---
problemNumber: 4
title: "Largest Palindrome Product"
description: "A palindromic number reads the same both ways. The largest palindrome made from the product of two 2-digit numbers is 9009 = 91 × 99. Find the largest palindrome made from the product of two 3-digit numbers. Answer: 906609"
difficulty: "easy"
date: 2026-03-10
technologies: ["cpp", "java", "javascript", "python", "ruby", "go", "rust"]
implementations:
  - language: "cpp"
    code: |
      // https://projecteuler.net/problem=4
      
      // A palindromic number reads the same both ways.
      // The largest palindrome made from the product of two 2-digit numbers is 9009 = 91 x 99.
      // Find the largest palindrome made from the product of two 3-digit numbers.
      
      // Answer: 906609
      #include <iostream>
      #include <cstdint>
      
      using namespace std;
      
      bool palindrome_test(uint64_t test_me)
      {
        uint64_t reversed = 0;
        uint64_t original = test_me;
      
        //cout << test_me << endl;
      
        while( 0 < original ){
          reversed = reversed * 10 + (original % 10);
          original /= 10;
        }
      
        return (test_me == reversed);
      }
      
      uint64_t prob004_brute_force()
      {
        uint32_t max_pali = 0;
        for( uint32_t i = 999 ; --i > 100 ;){
          for( uint32_t j = 999 ; --j > 100;){
            uint64_t t = i*j;
            if(palindrome_test(t)){
              if( t > max_pali ){
                max_pali = t;
              }
            }
          }
        }
        return max_pali;
      }
      
      #if ! defined UNITTEST_MODE
      int main(int argc, char const *argv[])
      {
        cout << prob004_brute_force() << endl;
      }
      #endif // UNITTEST_MODE
    githubLink: "https://github.com/tvarley/euler/blob/master/cpp/src/euler004.cpp"
    performance: "O(n) time complexity"
  - language: "java"
    code: |
      package org.tvarley.euler.solutions;
      
      import org.tvarley.euler.Solution;
      
      public class Solution004 implements Solution {
        public String solve() {
          int maxPalindrome = 0;
          for (int i = 100; i < 1000; i++) {
            for (int j = i; j < 1000; j++) {
              int product = i * j;
              if (isPalindrome(product) && product > maxPalindrome) {
                maxPalindrome = product;
              }
            }
          }
          return Integer.toString(maxPalindrome);
        }
      
        private boolean isPalindrome(int number) {
          String str = Integer.toString(number);
          return str.equals(new StringBuilder(str).reverse().toString());
        }
      }
    githubLink: "https://github.com/tvarley/euler/blob/master/java/src/main/java/org/tvarley/euler/solutions/Solution004.java"
  - language: "javascript"
    code: |
      Object.defineProperty(Number.prototype, "palindromeTest", {
        value: function () {
          var stringy = '' + this;
      
          for (var x = 0 , y = stringy.length - 1 ; x < y ; x++, y--) {
            if (stringy[x] !== stringy[y]) {
              return false;
            }
          }
      
          return true;
        },
        writable: true,
        configurable: true
      });
      
      module.exports = {
        answer : () => {
          var max_pali = 0;
          for(i = 100; i < 999; i++) {
            for(j = 100; j < 999; j++) {
              var t = (i * j);
              if( t > max_pali && t.palindromeTest() ) {
                max_pali = t;
              }
            }
          }
          return max_pali;
        }
      }
    githubLink: "https://github.com/tvarley/euler/blob/master/javascript/src/euler/solution004.js"
  - language: "python"
    code: |
      def solve():
          """
          Largest palindrome product
          A palindromic number reads the same both ways. The largest palindrome made from the product
          of two 2-digit numbers is 9009 = 91 × 99.
          Find the largest palindrome made from the product of two 3-digit numbers.
          """
          max_pal = 0
          for i in range(100, 1000):
              for j in range(100, 1000):
                  prod = i * j
                  if str(prod) == str(prod)[::-1] and prod > max_pal:
                      max_pal = prod
          return max_pal
    githubLink: "https://github.com/tvarley/euler/blob/master/python/src/euler004.py"
  - language: "ruby"
    code: |
      def palindrome_test(test_me)
        reversed = 0
        original = test_me
      
        while original.positive?
          reversed = reversed * 10 + (original % 10)
          original /= 10
        end
      
        (test_me == reversed)
      end
      
      def prob004_brute_force
        max_pali = 0
        (100..999).each do |i|
          (100..999).each do |j|
            t = i * j
            max_pali = t if (t > max_pali) && palindrome_test(t)
          end
        end
        max_pali
      end
      
      puts prob004_brute_force if __FILE__ == $PROGRAM_NAME
    githubLink: "https://github.com/tvarley/euler/blob/master/ruby/lib/euler004.rb"
  - language: "go"
    code: |
      package main
      
      import "fmt"
      
      func isPalindrome(n int) bool {
      
          s := fmt.Sprintf("%d", n)
      
          for i := 0; i < len(s)/2; i++ {
      
              if s[i] != s[len(s)-1-i] {
      
                  return false
      
              }
      
          }
      
          return true
      
      }
      
      func main() {
      
          max := 0
      
          for i := 999; i >= 100; i-- {
      
              for j := i; j >= 100; j-- {
      
                  prod := i * j
      
                  if prod <= max {
      
                      break
      
                  }
      
                  if isPalindrome(prod) {
      
                      if prod > max {
      
                          max = prod
      
                      }
      
                  }
      
              }
      
          }
      
          fmt.Println(max)
      
      }
    githubLink: "https://github.com/tvarley/euler/blob/master/go/euler004.go"
  - language: "rust"
    code: |
      // https://projecteuler.net/problem=4
      
      // A palindromic number reads the same both ways.
      // The largest palindrome made from the product of two 2-digit numbers is 9009 = 91 x 99.
      // Find the largest palindrome made from the product of two 3-digit numbers.
      
      // Answer: 906609
      
      fn palindrome_test(test_me: u64) -> bool
      {
          let mut reversed = 0;
          let mut original = test_me;
      
          while 0 < original {
              reversed = reversed * 10 + (original % 10);
              original /= 10;
          }
      
          return test_me == reversed;
      }
      
      pub fn prob004_brute_force() -> u64
      {
          let mut max_pali = 0;
          for i in (100..999).rev() {
              for j in (100..999).rev() {
                  let t = i * j;
                  if palindrome_test(t) {
                      if t > max_pali {
                          max_pali = t;
                      }
                  }
              }
          }
          return max_pali;
      }
      
      #[cfg(test)]
      mod tests {
          use super::*;
      
          #[test]
          fn euler_004() {
              assert_eq!(prob004_brute_force(), 906_609 );
          }
      }
    githubLink: "https://github.com/tvarley/euler/blob/master/rust/src/euler004.rs"
tags: ["euler"]
featured: false
showcase: true
---

## Additional Notes

This is Project Euler problem 4: Largest Palindrome Product.

A palindromic number reads the same both ways. The largest palindrome made from the product of two 2-digit numbers is 9009 = 91 × 99. Find the largest palindrome made from the product of two 3-digit numbers. Answer: 906609
