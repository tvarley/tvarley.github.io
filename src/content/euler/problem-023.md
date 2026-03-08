---
problemNumber: 23
title: Non-abundant sums
description: >-
  A perfect number is a number for which the sum of its proper divisors is exactly equal to the number. For example, the sum of the proper divisors of 28 would be:

  \(1 + 2 + 4 + 7 + 14 = 28\)

  which means that 28 is a perfect number.

  A number \(n\) is called deficient if the sum of its proper divisors is less than \(n\) and it is called abundant if this sum exceeds \(n\).

  As 12 is the smallest abundant number:

  \(1 + 2 + 3 + 4 + 6 = 16\)

  the smallest number that can be written as the sum of two abundant numbers is 24. By mathematical analysis, it can be shown that all integers greater than 28123 can be written as the sum of two abundant numbers. However, this upper limit cannot be reduced any further by analysis even though it is known that the greatest number that cannot be expressed as the sum of two abundant numbers is less than this limit.

  Find the sum of all the positive integers which cannot be written as the sum of two abundant numbers.
difficulty: easy
date: 2021-06-01
technologies:
  - cpp
implementations:
  - language: cpp
    code: |
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
    githubLink: https://gitlab.com/tvarley/euler/-/blob/master/cpp/src/euler023.cpp
    performance: O(n²) time complexity due to nested loops over the list of abundant numbers, but efficient for the given limit of 28123.
tags:
  - euler
  - problem-solving
featured: false
showcase: true
---

## Additional Notes

This solution classifies numbers as perfect, deficient, or abundant based on their proper divisors. It then finds all abundant numbers up to 28123 and computes which numbers can be expressed as sums of two abundant numbers. The sum of numbers that cannot be expressed this way is calculated.

The algorithm uses a boolean array to mark sums efficiently, avoiding redundant computations.