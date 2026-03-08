---
problemNumber: 21
title: "Amicable numbers"
description: |
  Let \(d(n)\) be defined as the sum of proper divisors of \(n\) (numbers less than \(n\) which divide evenly into \(n\)).

  If \(d(a) = b\) and \(d(b) = a\), where \(a \neq b\), then \(a\) and \(b\) are an amicable pair and each of \(a\) and \(b\) are called amicable numbers.

  For example, the proper divisors of 220 are 1, 2, 4, 5, 10, 11, 20, 22, 44, 55 and 110; therefore \(d(220) = 284\).

  The proper divisors of 284 are 1, 2, 4, 71 and 142; so \(d(284) = 220\).

  Evaluate the sum of all the amicable numbers under 10000.
difficulty: "easy"
date: 2015-03-01
technologies: ["cpp"]
implementations:
  - language: "cpp"
    code: |
      #include <iostream>

      int amicable_numbers_sum(int max)
      {
        int amic_sum = 0;

        for(int i = 1; i < max; i++){
          int a = 0;
          for(int j = 1; j < i; j++){
            if(0 == (i % j)){
              a += j;
            }
          }

          int b = 0;
          for(int k = 1; k < a; k++){
            if(0 == (a % k)){
              b += k;
            }
          }

          if(b == i && b != a){
            amic_sum += i;
          }
        }

        return amic_sum;
      }

      int main(int argc, char const *argv[]) {
        std::cout << "Answer: " << amicable_numbers_sum(10000) << std::endl;
      }
    githubLink: "https://github.com/tvarley/euler/blob/master/cpp/src/euler021.cpp"
    performance: "O(n²) time complexity due to nested divisor summation"
tags: ["euler", "amicable", "divisors"]
featured: false
showcase: true
---

## Additional Notes

Amicable numbers are pairs of numbers where each equals the sum of the proper divisors of the other. This problem finds all amicable numbers under 10000 and sums them. The solution uses brute force divisor calculation, which is acceptable for the given range.