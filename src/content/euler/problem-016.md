---
problemNumber: 16
title: "Power digit sum"
description: |
  \(2^{15} = 32768\) and the sum of its digits is \(3 + 2 + 7 + 6 + 8 = 26\).

  What is the sum of the digits of the number \(2^{1000}\)?
difficulty: "easy"
date: 2015-02-12
technologies: ["cpp", "ruby"]
implementations:
  - language: "cpp"
    code: |
      #include <iostream>
      #include <vector>

      int power_digit_sum(size_t max)
      {
        std::vector<int> numbers;
        numbers.push_back(1);

        for (size_t i = 0; i < max; i++) {
          int carry = 0;

          for (auto& n : numbers) {
            n *= 2;
            n += carry;
            carry = (n >= 10) ? 1 : 0;
            n -= (carry * 10);
          }

          if( 0 != carry ){
            numbers.push_back(carry);
          }
        }

        int total = 0;

        for (auto itr = numbers.rbegin() ; itr != numbers.rend() ; itr++) {
          total += *itr;
        }

        return total;
      }

      int main(int argc, char const *argv[]) {
        std::cout << "Answer: " << power_digit_sum(1000) << std::endl;
      }
    githubLink: "https://github.com/tvarley/euler/blob/master/cpp/src/euler016.cpp"
    performance: "O(n²) time complexity for digit-wise multiplication"
  - language: "ruby"
    code: |
      def power_digit_sum(power)
        digits = (2**power).to_s
        digits.split('').reduce(0) { |sum, digit| sum + digit.to_i }
      end

      puts power_digit_sum(1000) if __FILE__ == $PROGRAM_NAME
    githubLink: "https://gitlab.com/tvarley/euler/blob/master/ruby/lib/euler016.rb"
tags: ["euler", "power", "digit_sum"]
featured: false
showcase: true
---

## Additional Notes

This problem involves calculating 2^1000 and summing its digits. The number has over 300 digits, requiring big integer handling. The C++ solution manually implements digit-by-digit multiplication, while Ruby's built-in arbitrary precision integers make the calculation straightforward.