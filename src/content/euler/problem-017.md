---
problemNumber: 17
title: "Number letter counts"
description: |
  If the numbers 1 to 5 are written out in words: one, two, three, four, five, then there are \(3 + 3 + 5 + 4 + 4 = 19\) letters used in total.

  If all the numbers from 1 to 1000 (one thousand) inclusive were written out in words, how many letters would be used?

  NOTE: Do not count spaces or hyphens. For example, 342 (three hundred and forty-two) contains 23 letters and 115 (one hundred and fifteen) contains 20 letters. The use of "and" when writing out numbers is in compliance with British usage.
difficulty: "easy"
date: 2015-02-13
technologies: ["cpp", "ruby"]
implementations:
  - language: "cpp"
    code: |
      #include <iostream>

      template <int n> int count_letter()
      {
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

      int main(int argc, char const *argv[]) {
        mp_for<1,1001>()(); // Template recursion stops at <1001,1001>
        std::cout << "Answer: " << g_letter_count << std::endl;
      }
    githubLink: "https://github.com/tvarley/euler/blob/master/cpp/src/euler017.cpp"
    performance: "O(1) time complexity using compile-time computation"
  - language: "ruby"
    code: |
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

      puts number_letter_counts(1000) if __FILE__ == $PROGRAM_NAME
    githubLink: "https://gitlab.com/tvarley/euler/blob/master/ruby/lib/euler017.rb"
tags: ["euler", "letters", "numbers"]
featured: false
showcase: true
---

## Additional Notes

This problem requires counting the letters in the written form of numbers from 1 to 1000, following British conventions including the word "and". The C++ solution uses template metaprogramming to compute the letter counts at compile time, while the Ruby version manually constructs word representations using a recursive approach.