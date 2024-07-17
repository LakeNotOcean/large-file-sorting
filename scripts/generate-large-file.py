import random
import string

def generate_random_string(length):
    return ''.join(random.choices(string.ascii_letters + string.digits, k=length))

def generate_large_file(file_name, target_size_gb):
    target_size_bytes = target_size_gb * 1024**3
    with open(file_name, 'w', encoding='utf-8') as f:
        while f.tell() < target_size_bytes:
            random_string = generate_random_string(random.randint(1,1000)) 
            f.write(random_string + '\n')

file_name = 'D:\\test\\large_file.txt'
target_size_gb = 3

generate_large_file(file_name, target_size_gb)
