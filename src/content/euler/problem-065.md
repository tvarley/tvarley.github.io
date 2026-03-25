---
problemNumber: 65
title: Convergents of e
description: |
  The square root of 2 can be written as an infinite continued fraction.

  $$\sqrt{2} = 1 + \dfrac{1}{2 + \dfrac{1}{2 + \dfrac{1}{2 + \dfrac{1}{2 + ...}}}}$$

  The infinite continued fraction can be written, $\sqrt{2} = [1; (2)]$, $(2)$ indicates that 2 repeats ad infinitum. In a similar way, $\sqrt{23} = [4; (1, 3, 1, 8)]$.

  It turns out that the sequence of partial values of continued fractions for square roots provide the best rational approximations. Let us consider the convergents for $\sqrt{2}$.

  $$\begin{align}
  &1 + \dfrac{1}{2} &= \dfrac{3}{2} \\
  &1 + \dfrac{1}{2 + \dfrac{1}{2}} &= \dfrac{7}{5}\\
  &1 + \dfrac{1}{2 + \dfrac{1}{2 + \dfrac{1}{2}}} &= \dfrac{17}{12}\\
  &1 + \dfrac{1}{2 + \dfrac{1}{2 + \dfrac{1}{2 + \dfrac{1}{2}}}} &= \dfrac{41}{29}
  \end{align}$$

  Hence the sequence of the first ten convergents for $\sqrt{2}$ are:

  $$1, \dfrac{3}{2}, \dfrac{7}{5}, \dfrac{17}{12}, \dfrac{41}{29}, \dfrac{99}{70}, \dfrac{239}{169}, \dfrac{577}{408}, \dfrac{1393}{985}, \dfrac{3363}{2378}, ...$$

  What is most surprising is that the important mathematical constant,

  $$e = [2; 1, 2, 1, 1, 4, 1, ... , 1, 2k, 1, ...]$$

  The first ten terms in the sequence of convergents for $e$ are:

  $$2, 3, \dfrac{8}{3}, \dfrac{11}{4}, \dfrac{19}{7}, \dfrac{87}{32}, \dfrac{106}{39}, \dfrac{193}{71}, \dfrac{1264}{465}, \dfrac{1457}{536}, ...$$

  The sum of digits in the numerator of the 10th convergent is 1 + 4 + 5 + 7 = 17.

  Find the sum of digits in the numerator of the 100th convergent of the continued fraction for e.
difficulty: medium
date: 2004-03-12
technologies: [cpp, java, javascript, python, go, rust]
implementations:
  - language: cpp
    code: |
      #include <iostream>
      #include <string>
      #include <vector>
      #include <algorithm>

      static std::string add_big(const std::string& a, const std::string& b) {
          std::string result;
          int carry = 0;
          int i = a.size() - 1;
          int j = b.size() - 1;
          while (i >= 0 || j >= 0 || carry) {
              int sum = carry;
              if (i >= 0) sum += a[i--] - '0';
              if (j >= 0) sum += b[j--] - '0';
              carry = sum / 10;
              result.push_back(sum % 10 + '0');
          }
          std::reverse(result.begin(), result.end());
          return result;
      }

      static std::string multiply_big(const std::string& a, int b) {
          std::string result;
          int carry = 0;
          for (int i = a.size() - 1; i >= 0; --i) {
              int prod = (a[i] - '0') * b + carry;
              carry = prod / 10;
              result.push_back(prod % 10 + '0');
          }
          while (carry) {
              result.push_back(carry % 10 + '0');
              carry /= 10;
          }
          std::reverse(result.begin(), result.end());
          return result;
      }

      static int sum_digits_big(const std::string& s) {
          int sum = 0;
          for (char c : s) sum += c - '0';
          return sum;
      }

      int convergents_of_e() {
          std::vector<int> terms;
          terms.push_back(2);
          for (int k = 1; ; ++k) {
              terms.push_back(1);
              terms.push_back(2 * k);
              terms.push_back(1);
              if (terms.size() >= 101) break;
          }
          std::string h_prev2 = "0";
          std::string h_prev1 = "1";
          std::string k_prev2 = "1";
          std::string k_prev1 = "0";
          for (int i = 0; i < 100; ++i) {
              std::string h = add_big(multiply_big(h_prev1, terms[i]), h_prev2);
              std::string k = add_big(multiply_big(k_prev1, terms[i]), k_prev2);
              h_prev2 = h_prev1;
              h_prev1 = h;
              k_prev2 = k_prev1;
              k_prev1 = k;
          }
          return sum_digits_big(h_prev1);
      }

      #if ! defined UNITTEST_MODE
      int main(int argc, char const *argv[]) {
          std::cout << convergents_of_e() << std::endl;
      }
      #endif // UNITTEST_MODE
    githubLink: https://github.com/tvarley/euler/blob/main/cpp/src/euler065.cpp
    performance: O(N) time, O(N) space (due to string lengths)
  - language: java
    code: |
      package org.tvarley.euler.solutions;

      import org.tvarley.euler.Solution;
      import java.util.*;

      public class Solution065 implements Solution {
        private static String addBig(String a, String b) {
          StringBuilder result = new StringBuilder();
          int carry = 0;
          int i = a.length() - 1;
          int j = b.length() - 1;
          while (i >= 0 || j >= 0 || carry > 0) {
            int sum = carry;
            if (i >= 0) sum += a.charAt(i--) - '0';
            if (j >= 0) sum += b.charAt(j--) - '0';
            carry = sum / 10;
            result.append(sum % 10);
          }
          return result.reverse().toString();
        }

        private static String multiplyBig(String a, int b) {
          StringBuilder result = new StringBuilder();
          int carry = 0;
          for (int i = a.length() - 1; i >= 0; i--) {
            int prod = (a.charAt(i) - '0') * b + carry;
            carry = prod / 10;
            result.append(prod % 10);
          }
          while (carry > 0) {
            result.append(carry % 10);
            carry /= 10;
          }
          return result.reverse().toString();
        }

        private static int sumDigitsBig(String s) {
          int sum = 0;
          for (char c : s.toCharArray()) sum += c - '0';
          return sum;
        }

        public String solve() {
          List<Integer> terms = new ArrayList<>();
          terms.add(2);
          for (int k = 1; ; k++) {
            terms.add(1);
            terms.add(2 * k);
            terms.add(1);
            if (terms.size() >= 101) break;
          }
          String hPrev2 = "0";
          String hPrev1 = "1";
          String kPrev2 = "1";
          String kPrev1 = "0";
          for (int i = 0; i < 100; i++) {
            String h = addBig(multiplyBig(hPrev1, terms.get(i)), hPrev2);
            String k = addBig(multiplyBig(kPrev1, terms.get(i)), kPrev2);
            hPrev2 = hPrev1;
            hPrev1 = h;
            kPrev2 = kPrev1;
            kPrev1 = k;
          }
          return String.valueOf(sumDigitsBig(hPrev1));
        }
      }
    githubLink: https://github.com/tvarley/euler/blob/main/java/src/main/java/org/tvarley/euler/solutions/Solution065.java
    performance: O(N) time, O(N) space (due to string lengths)
  - language: javascript
    code: |
      function addBig(a, b) {
        let result = '';
        let carry = 0;
        let i = a.length - 1;
        let j = b.length - 1;
        while (i >= 0 || j >= 0 || carry) {
          let sum = carry;
          if (i >= 0) sum += a.charCodeAt(i--) - 48;
          if (j >= 0) sum += b.charCodeAt(j--) - 48;
          carry = Math.floor(sum / 10);
          result = (sum % 10) + result;
        }
        return result;
      }

      function multiplyBig(a, b) {
        let result = '';
        let carry = 0;
        for (let i = a.length - 1; i >= 0; i--) {
          const prod = (a.charCodeAt(i) - 48) * b + carry;
          carry = Math.floor(prod / 10);
          result = (prod % 10) + result;
        }
        while (carry) {
          result = (carry % 10) + result;
          carry = Math.floor(carry / 10);
        }
        return result;
      }

      function sumDigitsBig(s) {
        let sum = 0;
        for (const c of s) sum += c.charCodeAt(0) - 48;
        return sum;
      }

      function convergentsOfE() {
        const terms = [2];
        for (let k = 1; ; k++) {
          terms.push(1);
          terms.push(2 * k);
          terms.push(1);
          if (terms.length >= 101) break;
        }
        let hPrev2 = '0';
        let hPrev1 = '1';
        let kPrev2 = '1';
        let kPrev1 = '0';
        for (let i = 0; i < 100; i++) {
          const h = addBig(multiplyBig(hPrev1, terms[i]), hPrev2);
          const k = addBig(multiplyBig(kPrev1, terms[i]), kPrev2);
          hPrev2 = hPrev1;
          hPrev1 = h;
          kPrev2 = kPrev1;
          kPrev1 = k;
        }
        return sumDigitsBig(hPrev1);
      }

      module.exports = {
        answer: () => convergentsOfE()
      };
    githubLink: https://github.com/tvarley/euler/blob/main/javascript/src/euler/solution065.js
    performance: O(N) time, O(N) space (due to string lengths)
  - language: python
    code: |
      def solve():
          terms = [2]
          k = 1
          while len(terms) < 101:
              terms.append(1)
              terms.append(2 * k)
              terms.append(1)
              k += 1
          h_prev2 = 0
          h_prev1 = 1
          k_prev2 = 1
          k_prev1 = 0
          for i in range(100):
              h = h_prev1 * terms[i] + h_prev2
              k = k_prev1 * terms[i] + k_prev2
              h_prev2, h_prev1 = h_prev1, h
              k_prev2, k_prev1 = k_prev1, k
          return sum(int(d) for d in str(h_prev1))
    githubLink: https://github.com/tvarley/euler/blob/main/python/src/euler065.py
    performance: O(N) time, O(N) space (due to integer size)
  - language: go
    code: |
      package main

      import (
      	"fmt"
      	"strconv"
      )

      func addBig(a, b string) string {
      	result := ""
      	carry := 0
      	i := len(a) - 1
      	j := len(b) - 1
      	for i >= 0 || j >= 0 || carry > 0 {
      		sum := carry
      		if i >= 0 {
      			sum += int(a[i] - '0')
      			i--
      		}
      		if j >= 0 {
      			sum += int(b[j] - '0')
      			j--
      		}
      		carry = sum / 10
      		result = strconv.Itoa(sum%10) + result
      	}
      	return result
      }

      func multiplyBig(a string, b int) string {
      	result := ""
      	carry := 0
      	for i := len(a) - 1; i >= 0; i-- {
      		prod := int(a[i]-'0')*b + carry
      		carry = prod / 10
      		result = strconv.Itoa(prod%10) + result
      	}
      	for carry > 0 {
      		result = strconv.Itoa(carry%10) + result
      		carry /= 10
      	}
      	return result
      }

      func sumDigitsBig(s string) int {
      	sum := 0
      	for _, c := range s {
      		sum += int(c - '0')
      	}
      	return sum
      }

      func convergentsOfE() int {
      	terms := []int{2}
      	for k := 1; ; k++ {
      		terms = append(terms, 1)
      		terms = append(terms, 2*k)
      		terms = append(terms, 1)
      		if len(terms) >= 101 {
      			break
      		}
      	}
      	hPrev2 := "0"
      	hPrev1 := "1"
      	kPrev2 := "1"
      	kPrev1 := "0"
      	for i := 0; i < 100; i++ {
      		h := addBig(multiplyBig(hPrev1, terms[i]), hPrev2)
      		k := addBig(multiplyBig(kPrev1, terms[i]), kPrev2)
      		hPrev2 = hPrev1
      		hPrev1 = h
      		kPrev2 = kPrev1
      		kPrev1 = k
      	}
      	return sumDigitsBig(hPrev1)
      }

      func main() {
      	fmt.Println(convergentsOfE())
      }
    githubLink: https://github.com/tvarley/euler/blob/main/go/euler065.go
    performance: O(N) time, O(N) space (due to string lengths)
  - language: rust
    code: |
      use num_bigint::BigInt;
      use num_traits::Zero;

      pub fn convergents_of_e() -> u32 {
          let mut terms = vec![2];
          let mut k = 1;
          while terms.len() < 101 {
              terms.push(1);
              terms.push(2 * k);
              terms.push(1);
              k += 1;
          }
          let mut h_prev2 = BigInt::zero();
          let mut h_prev1 = BigInt::from(1);
          let mut k_prev2 = BigInt::from(1);
          let mut k_prev1 = BigInt::zero();
          for i in 0..100 {
              let h = &h_prev1 * terms[i] + &h_prev2;
              let k = &k_prev1 * terms[i] + &k_prev2;
              h_prev2 = h_prev1.clone();
              h_prev1 = h;
              k_prev2 = k_prev1.clone();
              k_prev1 = k;
          }
          h_prev1.to_string().chars().map(|c| c.to_digit(10).unwrap()).sum()
      }
    githubLink: https://github.com/tvarley/euler/blob/main/rust/src/euler065.rs
    performance: O(N) time, O(N) space (due to BigInt size)
tags: [continued-fractions, euler-number]
featured: false
showcase: false
solutionNotes: |
  ## Mathematical Background
  This problem involves computing convergents of the continued fraction representation of e (Euler's number). The continued fraction for e has a specific pattern where terms follow [2; 1, 2, 1, 1, 4, 1, 1, 6, 1, ..., 1, 2k, 1, ...]. Convergents are computed using the recurrence relations h_n = a_n * h_{n-1} + h_{n-2} and k_n = a_n * k_{n-1} + k_{n-2}.

  ## Algorithm Overview
  The solution generates the first 100 terms of the continued fraction for e, then iteratively computes the convergents using big integer arithmetic. Since the 100th convergent has hundreds of digits, all implementations except Python use string-based or library big integers. The final step sums the digits of the numerator.

  ## Performance Analysis
  Time complexity is O(N) where N=100, dominated by big integer operations. Space complexity is O(N) due to storing the growing numerator and denominator. Most implementations run in sub-millisecond time on modern hardware.

  ## Key Insights
  The continued fraction for e produces extremely large numbers quickly, requiring big integer support. Python's arbitrary-precision integers make it particularly elegant for this problem. The pattern of terms (2,1,2k,1 repeating) creates the rapid growth characteristic of e's convergents.

  ## Educational Value
  This problem demonstrates the power of continued fractions for representing transcendental numbers and their computational challenges. It introduces big integer arithmetic and the importance of numerical stability in mathematical computations.
---