# Приложение сортировки больших файлов

## Описание

Тестовое задание для компании "TAGES" на вакансию Node.js разработчик. Представляет собой небольшую программу для построчной сортировки выбранного файла большого размера.

## Подход

Используется классический подход для сортировки данных, которые не вмещаются полностью в оперативную память. Предварительно построчно считываем исходный файл до тех пор, пока не заполнится строковый буфер. Заполненный буфер сортируем и записываем в новый, отдельный файл. Повторяем до тех пор, пока исходный файл не будет полностью обработан. После этого применяем [внешнюю сортировку](https://ru.wikipedia.org/wiki/%D0%92%D0%BD%D0%B5%D1%88%D0%BD%D1%8F%D1%8F_%D1%81%D0%BE%D1%80%D1%82%D0%B8%D1%80%D0%BE%D0%B2%D0%BA%D0%B0) для полученных файлов до тех пор, пока не останется единственный отсортированный файл.

Недостатки:

- У метода есть критический в некоторых случаях недостаток - строка должна умещаться в оперативной памяти. В таких случаях рациональнее провести предварительное форматирования тектса или использовать более низкоуровневый язык для решения задачи.

## Настройка

### Установка

Перед запуском предварительно установить зависимости:

- npm

```sh
  npm install
```

Собрать приложение:

- npm

```sh
    npm run file-sort:build
```

### Конфигурация

Конфигурация приложения расположена в файле:
_env/config.env_

Доступны следующие параметры:

- _file_name_ (string) - название целевого файла;
- _workingDir_ (string) - директория, в которой находится файл;
- _stringBufferSize_ (number + b|kb|mb|gb) - объем буфера строк;
- _printMemoryUsage_(boolean) - выводить ли статистику использования памяти;

## Особенности

- В директории желательно указывать абсолютный путь. Также во время работы создается временная папка в рабочей директории.
- Объем буфера строк не равняется объему приложения. **Общий объем используемой оперативной памяти может быть больше примерно на 150мб**.
- Итоговый результат сохраняется в рабочей директории в файле с префиксом _sorted_.
- Используется ручной вызов сборщика мусора после освобождения буфера. Это замедляет работу, но в противном случае объем используемой памяти может кратковременно удвоиться.
- Временные файлы имеют названия типа _tmp_current_0_ или _tmp_previous_0_. В зависимости от стадии внешней сортировки.

## Запуск

Для запуска выполнить:

- npm

```sh
    npm run file-sort
```
