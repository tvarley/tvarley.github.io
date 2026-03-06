---
problemNumber: 20
title: "Factorial digit sum"
description: "n! means n × (n − 1) × ... × 3 × 2 × 1. For example, 10! = 10 × 9 × ... × 3 × 2 × 1 = 3628800, and the sum of the digits in the number 10! is 3 + 6 + 2 + 8 + 8 + 0 + 0 = 27. Find the sum of the digits in the number 100!"
difficulty: "easy"
date: 2015-02-20
technologies: ["cpp"]
implementations:
  - language: "cpp"
    code: |
      #include <iostream>

      static const int big_size = 500;

      int factorial_digit_sum(int fme)
      {
        int digits[big_size] = {0};
        digits[0] = 1;

        int high_water = 2;

        for (size_t factor = 2; factor <= fme; factor++) {
          int carry = 0;
          for (size_t j = 0; j < high_water; j++) {
            int x = digits[j] * factor + carry;
            digits[j] = x % 10;
            carry = x / 10;
          }
          while (carry > 0) {
            digits[high_water] = carry % 10;
            carry /= 10;
            high_water++;
          }
        }

        int ret = 0;
        for (size_t i = 0; i < high_water; i++) {
          ret += digits[i];
        }
        return ret;
      }

      int main(int argc, char const *argv[])
      {
        std::cout << "Answer: " << factorial_digit_sum(100) << std::endl;
      }
    githubLink: "https://github.com/tvarley/euler/blob/master/cpp/src/euler020.cpp"
    performance: "O(n²) time complexity for factorial calculation"
tags: ["euler", "factorial", "digits"]
featured: false
showcase: true
---

## Additional Notes

This problem involves calculating 100! and summing its digits. Since 100! has over 150 digits, the solution implements manual digit-by-digit multiplication with carry handling in an array. This approach avoids the need for arbitrary-precision arithmetic libraries while efficiently computing the factorial.