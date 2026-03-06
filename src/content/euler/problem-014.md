---
problemNumber: 14
title: "Longest Collatz sequence"
description: "The following iterative sequence is defined for the set of positive integers: n → n/2 (n is even), n → 3n + 1 (n is odd). Using the rule above and starting with 13, we generate the following sequence: 13 → 40 → 20 → 10 → 5 → 16 → 8 → 4 → 2 → 1. It can be seen that this sequence (starting at 13 and finishing at 1) contains 10 terms. Although it has not been proved yet (Collatz Problem), it is thought that all starting numbers finish at 1. Which starting number, under one million, produces the longest chain? NOTE: Once the chain starts the terms are allowed to go above one million."
difficulty: "easy"
date: 2015-02-10
technologies: ["cpp", "ruby"]
implementations:
  - language: "cpp"
    code: |
      #include <iostream>
      #include <vector>
      #include <cstdint>

      uint64_t next_collatz_term(uint64_t prev)
      {
        uint64_t ret;
        if( 0 == (prev%2)){
          ret = prev/2;
        }else{
          ret = (3 * prev)+1;
        }
        return ret;
      }

      static std::vector<int> previous_counts(1000000,-1);

      int count_collatz_terms_opt(uint64_t start)
      {
        if( 1 == start ) return 1;

        int count = 0;

        if( start < 1000000 ){
          count = previous_counts.at(start);
          if( -1 == count ){
            count = count_collatz_terms_opt(next_collatz_term(start));
            count++;
            previous_counts.at(start) = count;
          }
        }else{
          while( 1 != start ){
            start = next_collatz_term(start);
            count++;
          }
          count++;
        }

        return count;
      }

      uint64_t longest_collatz_sequence_opt(uint64_t max_check)
      {
        int max_count = 0;
        int max_counter = 0;

        for (uint64_t i = 2; i < max_check; i++) {
          if( -1 == previous_counts.at(i) ){
            int count = count_collatz_terms_opt(i);
            if( max_count < count ){
              max_count = count;
              max_counter = i;
            }
          }
        }

        return max_counter;
      }

      int main(int argc, char const *argv[])
      {
        int answer = longest_collatz_sequence_opt(1000000);
        std::cout << "Answer: " << answer << std::endl;
      }
    githubLink: "https://github.com/tvarley/euler/blob/master/cpp/src/euler014.cpp"
    performance: "O(n) time complexity with memoization for under 1 million"
  - language: "ruby"
    code: |
      $cache = []

      def collatz_sequence_length(start, options = {})
        options = { cache: true }.merge(options)

        chain_length = 1
        current_value = start

        while 1 != current_value
          unless $cache[current_value].nil?
            chain_length += $cache[current_value]
            break
          end

          chain_length += 1

          if current_value.even?
            current_value /= 2
          else
            current_value = (current_value * 3) + 1
          end
        end

        $cache[start] = chain_length if options[:cache]
        chain_length
      end

      def longest_collatz_sequence
        longest_starting_number = 1
        max_chain_length = -1

        2.upto(1_000_000) do |i|
          chain_length = collatz_sequence_length(i)
          if chain_length > max_chain_length
            longest_starting_number = i
            max_chain_length = chain_length
          end
        end
        longest_starting_number
      end

      puts longest_collatz_sequence if __FILE__ == $PROGRAM_NAME
    githubLink: "https://gitlab.com/tvarley/euler/blob/master/ruby/lib/euler014.rb"
tags: ["euler", "collatz", "sequence"]
featured: false
showcase: true
---

## Additional Notes

The Collatz conjecture states that all positive integers will eventually reach 1 using the given rules. This problem requires finding the starting number under 1 million that produces the longest chain before reaching 1. Memoization dramatically improves performance by caching sequence lengths for previously computed values.