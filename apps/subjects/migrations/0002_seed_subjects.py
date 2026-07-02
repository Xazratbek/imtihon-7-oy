from django.db import migrations

SUBJECTS = [
    "Python",
    "Django",
    "Django REST Framework",
    "JavaScript",
    "React",
    "Database",
    "Algoritmlar",
    "Ma'lumotlar tuzilmalari",
    "Operatsion tizimlar",
    "Kompyuter tarmoqlari",
    "Sun'iy intellekt",
    "Machine Learning",
    "Ingliz tili",
    "Rus tili",
    "Matematik analiz",
    "Chiziqli algebra",
    "Ehtimollar nazariyasi",
    "Fizika",
    "Kimyo",
    "Iqtisodiyot nazariyasi",
    "Huquq asoslari",
    "Falsafa",
    "Diskret matematika",
    "Dasturiy injiniring",
]


def seed_subjects(apps, schema_editor):
    Subject = apps.get_model("subjects", "Subject")
    for name in SUBJECTS:
        Subject.objects.get_or_create(name=name)


def remove_subjects(apps, schema_editor):
    Subject = apps.get_model("subjects", "Subject")
    Subject.objects.filter(name__in=SUBJECTS).delete()


class Migration(migrations.Migration):
    dependencies = [
        ("subjects", "0001_initial"),
    ]

    operations = [
        migrations.RunPython(seed_subjects, remove_subjects),
    ]
