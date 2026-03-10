---
problemNumber: 17
title: "Number Letter Counts"
description: |
  If the numbers $1$ to $5$ are written out in words: one, two, three, four, five, then there are $3 + 3 + 5 + 4 + 4 = 19$ letters used in total.

  If all the numbers from $1$ to $1000$ (one thousand) inclusive were written out in words, how many letters would be used?

  **NOTE:** Do not count spaces or hyphens. For example, $342$ (three hundred and forty-two) contains $23$ letters and $115$ (one hundred and fifteen) contains $20$ letters. The use of "and" when writing out numbers is in compliance with British usage.
difficulty: "medium"
date: 2026-03-10
technologies: ["cpp", "java", "javascript", "python", "ruby", "go", "rust"]
implementations:
  - language: "cpp"
    code: |
      // https://projecteuler.net/problem=17
      // Number letter counts
      
      // If the numbers 1 to 5 are written out in words: one, two, three, four, five,
      // then there are 3 + 3 + 5 + 4 + 4 = 19 letters used in total.
      //
      // If all the numbers from 1 to 1000 (one thousand) inclusive were written out
      // in words, how many letters would be used?
      //
      // NOTE: Do not count spaces or hyphens.
      // For example, 342 (three hundred and forty-two) contains 23 letters and
      // 115 (one hundred and fifteen) contains 20 letters.
      // The use of "and" when writing out numbers is in compliance with
      // British usage.
      
      // Answer: 21124
      
      #include <iostream>
      
      template <int n> int count_letter()
      {
        // TODO: We could do deeper: count_letter<int n, int demo> (<,10><,100>etc.)
        // ..but that might scare some folk and gain...nothing
        int x = 0;
        if( n < 100 ){
          return count_letter<(n/10)*10>() + count_letter<n%10>();
        }
      
        x = (count_letter<n/100>()+7);//+count_letter<100>());
        if( 0 != (n%100)){
          x += 3 + count_letter<n-((n/100)*100)>();
        }
        return x;
      }
      
      template <> int count_letter<0>(){return 0;}
      template <> int count_letter<1>(){return 3;}    // one
      template <> int count_letter<2>(){return 3;}    // two
      template <> int count_letter<3>(){return 5;}    // three
      template <> int count_letter<4>(){return 4;}    // four
      template <> int count_letter<5>(){return 4;}    // five
      template <> int count_letter<6>(){return 3;}    // six
      template <> int count_letter<7>(){return 5;}    // seven
      template <> int count_letter<8>(){return 5;}    // eight
      template <> int count_letter<9>(){return 4;}    // nine
      template <> int count_letter<10>(){return 3;}   // ten
      template <> int count_letter<11>(){return 6;}   // eleven
      template <> int count_letter<12>(){return 6;}   // twelve
      template <> int count_letter<13>(){return 8;}   // thirteen
      template <> int count_letter<14>(){return 8;}   // fourteen
      template <> int count_letter<15>(){return 7;}   // fifteen
      template <> int count_letter<16>(){return 7;}   // sixteen
      template <> int count_letter<17>(){return 9;}   // seventeen
      template <> int count_letter<18>(){return 8;}   // eighteen
      template <> int count_letter<19>(){return 8;}   // nineteen
      template <> int count_letter<20>(){return 6;}   // twenty
      template <> int count_letter<30>(){return 6;}   // thirty
      template <> int count_letter<40>(){return 5;}   // forty
      template <> int count_letter<50>(){return 5;}   // fifty
      template <> int count_letter<60>(){return 5;}   // sixty
      template <> int count_letter<70>(){return 7;}   // seventy
      template <> int count_letter<80>(){return 6;}   // eighty
      template <> int count_letter<90>(){return 6;}   // ninety
      template <> int count_letter<100>(){return 10;}  // onehundred
      template <> int count_letter<1000>(){return 11;} // onethousand
      
      static int g_letter_count = 0;
      
      template<int from,int to> struct mp_for
      {
        void operator()()
        {
          g_letter_count += count_letter<from>();
          mp_for<from+1,to>()();
        }
      };
      
      // Recursive template stop
      template<int from> struct mp_for<from,from>
      {
        void operator()(){};
      };
      
      #if ! defined UNITTEST_MODE
      int main(int argc, char const *argv[])
      {
        mp_for<1,1001>()(); // Template recursion stops at <1001,1001>
        std::cout << "Answer: " << g_letter_count << std::endl;
        return 0;
      }
      #endif // #if ! defined UNITTEST_MODE
    githubLink: "https://github.com/tvarley/euler/blob/master/cpp/src/euler017.cpp"
    performance: "O(n) time complexity"
  - language: "java"
    code: |
      package org.tvarley.euler.solutions;
      
      import org.tvarley.euler.Solution;
      
      public class Solution017 implements Solution {
        private static final String[] ONES = {"", "one", "two", "three", "four", "five", "six", "seven", "eight", "nine"};
        private static final String[] TEENS = {"ten", "eleven", "twelve", "thirteen", "fourteen", "fifteen", "sixteen", "seventeen", "eighteen", "nineteen"};
        private static final String[] TENS = {"", "", "twenty", "thirty", "forty", "fifty", "sixty", "seventy", "eighty", "ninety"};
      
        public String solve() {
          int totalLetters = 0;
          for (int i = 1; i <= 1000; i++) {
            totalLetters += countLetters(numberToWords(i));
          }
          return Integer.toString(totalLetters);
        }
      
        private String numberToWords(int n) {
          if (n == 1000) return "one thousand";
      
          StringBuilder sb = new StringBuilder();
      
          if (n >= 100) {
            sb.append(ONES[n / 100]).append(" hundred");
            n %= 100;
            if (n > 0) sb.append(" and ");
          }
      
          if (n >= 20) {
            sb.append(TENS[n / 10]);
            n %= 10;
            if (n > 0) sb.append("-");
          } else if (n >= 10) {
            sb.append(TEENS[n - 10]);
            return sb.toString();
          }
      
          if (n > 0) {
            sb.append(ONES[n]);
          }
      
          return sb.toString();
        }
      
        private int countLetters(String word) {
          int count = 0;
          for (char c : word.toCharArray()) {
            if (Character.isLetter(c)) {
              count++;
            }
          }
          return count;
        }
      }
    githubLink: "https://github.com/tvarley/euler/blob/master/java/src/main/java/org/tvarley/euler/solutions/Solution017.java"
  - language: "javascript"
    code: |
      const ones = ["", "one", "two", "three", "four", "five", "six", "seven", "eight", "nine"];
      const teens = ["ten", "eleven", "twelve", "thirteen", "fourteen", "fifteen", "sixteen", "seventeen", "eighteen", "nineteen"];
      const tens = ["", "", "twenty", "thirty", "forty", "fifty", "sixty", "seventy", "eighty", "ninety"];
      
      function numberToWords(n) {
        if (n === 1000) return "one thousand";
      
        let result = "";
      
        if (n >= 100) {
          result += ones[Math.floor(n / 100)] + " hundred";
          n %= 100;
          if (n > 0) result += " and ";
        }
      
        if (n >= 20) {
          result += tens[Math.floor(n / 10)];
          n %= 10;
          if (n > 0) result += "-" + ones[n];
        } else if (n >= 10) {
          result += teens[n - 10];
        } else if (n > 0) {
          result += ones[n];
        }
      
        return result;
      }
      
      module.exports = {
        answer: () => {
          let total = 0;
          for (let i = 1; i <= 1000; i++) {
            const words = numberToWords(i).replace(/[-\s]/g, "");
            total += words.length;
          }
          return total;
        }
      };
    githubLink: "https://github.com/tvarley/euler/blob/master/javascript/src/euler/solution017.js"
  - language: "python"
    code: |
      def solve():
          """
          Number letter counts
          If the numbers 1 to 5 are written out in words: one, two, three, four, five,
          then there are 3 + 3 + 5 + 4 + 4 = 19 letters used in total.
          If all the numbers from 1 to 1000 (one thousand) inclusive were written out in words,
          how many letters would be used?
          NOTE: Do not count spaces or hyphens. For example, 342 (three hundred and forty-two)
          contains 23 letters and 115 (one hundred and fifteen) contains 20 letters.
          The use of "and" when writing out numbers is in compliance with British usage.
          """
          def to_words(n):
              units = ["", "one", "two", "three", "four", "five", "six", "seven", "eight", "nine"]
              teens = ["ten", "eleven", "twelve", "thirteen", "fourteen", "fifteen", "sixteen", "seventeen", "eighteen", "nineteen"]
              tens = ["", "", "twenty", "thirty", "forty", "fifty", "sixty", "seventy", "eighty", "ninety"]
              if n == 1000:
                  return "one thousand"
              h = n // 100
              t = (n % 100) // 10
              u = n % 10
              words = []
              if h > 0:
                  words.append(units[h] + " hundred")
              if n % 100 != 0:
                  if h > 0:
                      words.append("and")
                  if t == 1:
                      words.append(teens[u])
                  else:
                      words.append(tens[t])
                      if u > 0:
                          words.append(units[u])
              return " ".join(words)
      
          total = 0
          for i in range(1, 1001):
              word = to_words(i).replace(" ", "").replace("-", "")
              total += len(word)
          return total
    githubLink: "https://github.com/tvarley/euler/blob/master/python/src/euler017.py"
  - language: "ruby"
    code: |
      require 'humanize'
      
      def simple_humanize_length(number)
        raise ArgumentError, 'Only supports (1..99999)' unless (1..99_999).cover?(number)
      
        result = ''
        working = number
      
        while working.positive?
          case working
          when (1000..99_999)
            how_many = (working / 1000).floor
            working -= 1000 * how_many
            result += "#{simple_humanize_length(how_many)}thousand"
          when (100..999)
            how_many = (working / 100).floor
            working -= 100 * how_many
            result += "#{simple_humanize_length(how_many)}hundred#{'and' unless working.zero?}"
          when (20..99)
            how_many = (working / 10).floor
            working -= 10 * how_many
            result += case how_many
                      when 4, 5, 6 # forty, fifty, sixty = 5
                        'aaaaa'
                      when 2, 3, 8, 9 # twenty, thirty, eighty, ninety = 6
                        'bbbbbb'
                      when 7 # seventy = 7
                        'ccccccc'
                      end
          else
            result += case working
                      when 1, 2, 6, 10 # one, two, six, ten = 3
                        'ddd'
                      when 4, 5, 9 # four, five, nine = 4
                        'eeee'
                      when 3, 7, 8 # three, seven, eight = 5
                        'fffff'
                      when 11, 12 # eleven, twelve = 6
                        'gggggg'
                      when 15, 16 # fifteen, sixteen = 7
                        'hhhhhhh'
                      when 13, 14, 18, 19 # thirteen, fourteen, eighteen, nineteen = 8
                        'iiiiiiii'
                      when 17
                        'jjjjjjjjj' # seventeen = 9
                      end
            working = 0
          end
        end
        result
      end
      
      def number_letter_counts(upper)
        (1..upper).reduce(0) do |sum, digit|
          sum + simple_humanize_length(digit).length
        end
      end
      
      def number_letter_counts_cheat(upper)
        (1..upper).reduce(0) { |sum, digit| sum + digit.humanize.tr(' -', '').length }
      end
      
      puts "Mine: #{number_letter_counts(1000)}" if __FILE__ == $PROGRAM_NAME
      puts "Cheat: #{number_letter_counts_cheat(1000)}" if __FILE__ == $PROGRAM_NAME
    githubLink: "https://github.com/tvarley/euler/blob/master/ruby/lib/euler017.rb"
  - language: "go"
    code: |
      package main
      
      import (
      
          "fmt"
      
          "strings"
      
      )
      
      func numberToWords(n int) string {
      
          if n == 1000 {
      
              return "one thousand"
      
          }
      
          if n == 0 {
      
              return ""
      
          }
      
          units := []string{"", "one", "two", "three", "four", "five", "six", "seven", "eight", "nine"}
      
          teens := []string{"ten", "eleven", "twelve", "thirteen", "fourteen", "fifteen", "sixteen", "seventeen", "eighteen", "nineteen"}
      
          tens := []string{"", "", "twenty", "thirty", "forty", "fifty", "sixty", "seventy", "eighty", "ninety"}
      
          var words []string
      
          hundreds := n / 100
      
          if hundreds > 0 {
      
              words = append(words, units[hundreds], "hundred")
      
              n %= 100
      
              if n > 0 {
      
                  words = append(words, "and")
      
              }
      
          }
      
          if n >= 20 {
      
              ten := n / 10
      
              words = append(words, tens[ten])
      
              n %= 10
      
              if n > 0 {
      
                  words = append(words, units[n])
      
              }
      
          } else if n >= 10 {
      
              words = append(words, teens[n-10])
      
          } else if n > 0 {
      
              words = append(words, units[n])
      
          }
      
          return strings.Join(words, " ")
      
      }
      
      func main() {
      
          total := 0
      
          for i := 1; i <= 1000; i++ {
      
              words := numberToWords(i)
      
              for _, c := range words {
      
                  if c != ' ' && c != '-' {
      
                      total++
      
                  }
      
              }
      
          }
      
          fmt.Println(total)
      
      }
    githubLink: "https://github.com/tvarley/euler/blob/master/go/euler017.go"
  - language: "rust"
    code: |
      // https://projecteuler.net/problem=17
      //
      // If the numbers 1 to 5 are written out in words: one, two, three, four, five, then there are 3 + 3 + 5 + 4 + 4 = 19 letters used in total.
      //
      // If all the numbers from 1 to 1000 (one thousand) inclusive were written out in words, how many letters would be used?
      //
      // NOTE: Do not count spaces or hyphens. For example, 342 (three hundred and forty-two) contains 23 letters and 115 (one hundred and fifteen) contains 20 letters. The use of "and" when writing out numbers is in compliance with British usage.
      //
      // Answer: 21124
      
      const UNITS: &[&str] = &["", "one", "two", "three", "four", "five", "six", "seven", "eight", "nine"];
      const TEENS: &[&str] = &["ten", "eleven", "twelve", "thirteen", "fourteen", "fifteen", "sixteen", "seventeen", "eighteen", "nineteen"];
      const TENS: &[&str] = &["", "", "twenty", "thirty", "forty", "fifty", "sixty", "seventy", "eighty", "ninety"];
      
      fn letter_count(n: usize) -> usize {
          if n == 1000 {
              return "onethousand".len();
          }
          let mut count = 0;
          let hundreds = n / 100;
          let remainder = n % 100;
          if hundreds > 0 {
              count += UNITS[hundreds].len() + "hundred".len();
              if remainder > 0 {
                  count += "and".len();
              }
          }
          if remainder >= 20 {
              let ten = remainder / 10;
              let unit = remainder % 10;
              count += TENS[ten].len();
              if unit > 0 {
                  count += UNITS[unit].len();
              }
          } else if remainder >= 10 {
              count += TEENS[remainder - 10].len();
          } else if remainder > 0 {
              count += UNITS[remainder].len();
          }
          count
      }
      
      pub fn number_letter_counts(limit: usize) -> usize {
          (1..=limit).map(letter_count).sum()
      }
      
      #[cfg(test)]
      mod tests {
          use super::*;
      
          #[test]
          fn euler_017() {
              assert_eq!(number_letter_counts(5), 19);
              assert_eq!(number_letter_counts(1000), 21124);
          }
      }
    githubLink: "https://github.com/tvarley/euler/blob/master/rust/src/euler017.rs"
tags: ["euler"]
featured: false
showcase: true
---

## Solution Notes

### Mathematical Background

This problem requires converting numbers from 1 to 1000 into their English word representations and counting the letters used. The challenge lies in handling the British English convention of using "and" when writing numbers (e.g., "one hundred and fifteen" instead of "one hundred fifteen").

The total letter count grows quadratically with the upper limit due to the increasing complexity of number representations. Numbers 1-99 follow relatively simple patterns, while 100-999 add "hundred" and "and" connectors, and 1000 requires special handling.

### Algorithm Analysis

**Number-to-words conversion**: Implement functions that break down numbers into hundreds, tens, and units components, using lookup tables for word representations.

**Letter counting**: Convert each number to its word form, then count alphabetic characters while ignoring spaces and hyphens.

**Approaches**:
- **Lookup table approach**: Pre-compute word lengths for common number components (ones, teens, tens)
- **String concatenation**: Build word representations by combining components with appropriate connectors
- **Template metaprogramming**: Use compile-time computation (as seen in C++ implementation)

Time complexity is O(n) where n=1000, with constant-time operations per number. Space complexity is O(1) using fixed-size lookup tables.

### Key Insights

- British English requires "and" between hundreds and tens/units (e.g., "one hundred and fifteen")
- "One thousand" is written as two words but counted as one unit
- Hyphens in compound numbers (twenty-one, thirty-four) are ignored in counting
- The pattern repeats every 100 numbers with increasing hundreds prefixes
- Template metaprogramming provides compile-time optimization in C++
- Total letter count for 1-1000 is 21,124

### Educational Value

This problem teaches:
- String manipulation and text processing
- Number system representation and conversion algorithms
- Handling special cases in algorithmic thinking
- The importance of precise problem requirements (British vs American English)
- Lookup table optimization techniques
- Modular code design with reusable number conversion functions
- When to use compile-time vs runtime computation
