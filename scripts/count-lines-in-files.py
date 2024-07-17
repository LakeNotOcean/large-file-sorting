import os
import re

def count_lines_in_files(directory, pattern):
    regex = re.compile(pattern)
    for file in os.listdir(directory):
        if regex.match(file):
            file_path = os.path.join(directory, file)
            with open(file_path, 'r', encoding='utf-8') as f:
                line_count = sum(1 for _ in f)
            print(f'Файл: {file} - Количество строк: {line_count}')

directory = 'D:\\test\\'
pattern = r'.*large_file.*'
count_lines_in_files(directory, pattern)