
from apps.users.models import Users

def admin_user():
    if not Users.objects.filter(username="admin2").exists():
        Users.objects.create_superuser("admin2", "admin2@gmail.com", "ADMIN12345")
        print("Superuser created successfull")
    else:
        print("superuser already exists")
